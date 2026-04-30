# Project Allocation Platform - Backend API

The backend for the Project Allocation Platform is a robust, RESTful API built with **Node.js, Express, and TypeScript**. It uses **Prisma** as an ORM to interact with a **PostgreSQL** database. 

It handles complex business logic including role-based access control (RBAC), multi-stage pooled allocations, file uploads (CSV parsing), real-time audit logging, and automated notification dispatching.

---

## 🚀 Tech Stack

- **Runtime:** Node.js (v18+ recommended)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (Access + Refresh tokens) & bcrypt
- **Security:** Helmet, CORS, express-rate-limit
- **File Uploads:** Multer & csv-parser (in-memory processing)
- **Logging:** Winston

---

## 📂 Project Structure

```text
backend/
├── prisma/
│   ├── schema.prisma      # DB schema, types, and relationships
│   ├── seed.ts            # Script to generate the Default Admin user
│   └── migrations/        # Auto-generated SQL history
├── src/
│   ├── config/            # DB client, environment variables, API limits
│   ├── middleware/        # auth, roles, rate-limits, validation, error handler
│   ├── modules/           # Feature domains (Services, Controllers, Routes, Validation)
│   │   ├── audit/         # Audit trail logging logic
│   │   ├── auth/          # Login, refresh tokens, password changes
│   │   ├── notifications/ # Notification creation and unread counts
│   │   ├── pools/         # Pool lifecycles, phase transitions, assignment
│   │   ├── projects/      # Proposal submissions, subadmin locking, admin approvals
│   │   ├── student-ideas/ # Custom pitch submissions by students
│   │   ├── teams/         # Team forming, invitations, and project locking
│   │   └── users/         # CRUD and Bulk CSV user imports
│   ├── shared/            # Utilities (logger, token generators, hashing, custom errors)
│   ├── app.ts             # Express App instantiation and Global Middleware
│   └── index.ts           # Server entrypoint
├── .env                   # Environment variables (Ignored in Git)
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root of the `backend/` directory.

```dotenv
NODE_ENV=development
PORT=5000

# PostgreSQL Connection
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/project_allocation?schema=public"

# JSON Web Tokens (Change secrets in production!)
JWT_ACCESS_SECRET="super-secret-access-key-change-in-production"
JWT_REFRESH_SECRET="super-secret-refresh-key-change-in-production"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# Security & App Settings
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN="http://localhost:5173"

# File Upload Limits
MAX_FILE_SIZE=5242880 # 5MB limit for CSVs

# Default Admin Seed Credentials
DEFAULT_ADMIN_EMAIL="admin@university.edu"
DEFAULT_ADMIN_PASSWORD="Admin@123456"
```

---

## 🛠️ Scripts & Setup

### 1. Database Setup (Local PostgreSQL)
You must have PostgreSQL running locally before starting the backend.

**Option A: Native Installation**
1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).
2. During installation, remember the password you set for the default `postgres` user.
3. Open **pgAdmin** (installed with PostgreSQL), create a new database named `project_allocation`.

**Option B: Using Docker (Recommended for quick setup)**
If you have Docker installed, you can spin up a Postgres container instantly:
```bash
docker run --name project-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=YOUR_PASSWORD -e POSTGRES_DB=project_allocation -p 5432:5432 -d postgres:15
```

### 2. Install Dependencies
```bash
npm install
```

### 2. Database Migration & Setup
Ensure your PostgreSQL instance is running and the `DATABASE_URL` is correct.

```bash
# Push schema to the database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed the default admin user into the DB
npm run seed
```

### 3. Running the Server
```bash
# Development (with hot-reload using tsx/nodemon)
npm run dev

# Production Build
npm run build
npm start
```

---

## 🔐 Authentication & Roles

The API uses standard `Bearer Auth` consisting of short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d).

There are four primary roles governed by the `authorize(...)` middleware:
1. `ADMIN` - Full control over Pools, Timelines, User Import, and Final Project Approvals.
2. `SUBADMIN` - Middle-layer reviewer, required to "Lock" exactly 3 faculty proposals and "Hold" exactly 1 per assigned faculty.
3. `FACULTY` - Submits the capped project proposals, guides assigned teams.
4. `STUDENT` - Forms teams, invites peers, selects projects, and proposes custom project ideas.

---

## ✨ Core API Highlights

* **Atomic Transactions:** When teams select an approved project (`/api/pools/:poolId/teams/:teamId/select`), Prisma `$transaction` scopes are utilized to prevent race conditions. Two teams cannot select the same available project at the exact same millisecond.
* **Fire-and-Forget Logging:** Both `auditService.log()` and `notificationsService.create()` calls immediately return promises that safely catch their own errors without blocking the synchronous event loop, ensuring optimal response times.
* **Memory-Safe CSV Processing:** Admin Bulk User Imports stream data using the `csv-parser` module directly out of Multer's memory buffers up to a capped row limit, preventing Node's memory from overflowing on massive datasets.
* **Custom Error Handling:** All domains utilize structured classes (`BadRequestError`, `UnauthorizedError`, `NotFoundError`) resolving instantly mapping to standardized JSON `{ success: false, message: ... }` responses via the global `errorHandler` middleware.
