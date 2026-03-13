import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),

  db: {
    url: process.env.DATABASE_URL!,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  },

  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10),
  },

  upload: {
    dir: path.resolve(process.env.UPLOAD_DIR || './uploads'),
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },

  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'Project Allocation <noreply@university.edu>',
  },

  defaultAdmin: {
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@iul.ac.in',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123456',
  },
} as const;