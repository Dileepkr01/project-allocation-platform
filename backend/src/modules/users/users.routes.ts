import { Router } from 'express';
import multer from 'multer';
import { usersController } from './users.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserSchema, listUsersSchema, updateUserSchema } from './users.validation';
import { IMPORT_LIMITS } from '../../config/constants';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMPORT_LIMITS.MAX_FILE_SIZE_MB * 1024 * 1024, files: 1 },
  fileFilter: (_r, file, cb) => { file.originalname.endsWith('.csv') ? cb(null, true) : cb(new Error('Only CSV')); },
});

const router = Router();
router.use(authenticate); // Require login for all routes

// Admin-only routes
const adminOnly = authorize('ADMIN');

router.get('/stats', adminOnly, (q, s, n) => usersController.getStats(q, s, n));
router.get('/import/template', adminOnly, (q, s, n) => usersController.downloadTemplate(q, s, n));
router.get('/import/jobs', adminOnly, (q, s, n) => usersController.getImportHistory(q, s, n));
router.get('/import/jobs/:jobId', adminOnly, (q, s, n) => usersController.getImportJob(q, s, n));
router.post('/bulk-import', adminOnly, upload.single('file'), (q, s, n) => usersController.bulkImport(q, s, n));

// Any authenticated user can list/view users (e.g. students finding teammates)
router.get('/', validateRequest(listUsersSchema), (q, s, n) => usersController.listUsers(q, s, n));
router.get('/:id', (q, s, n) => usersController.getUserById(q, s, n));

// Admin-only mutation routes
router.post('/', adminOnly, validateRequest(createUserSchema), (q, s, n) => usersController.createUser(q, s, n));
router.put('/:id', adminOnly, validateRequest(updateUserSchema), (q, s, n) => usersController.updateUser(q, s, n));
router.patch('/:id/toggle-status', adminOnly, (q, s, n) => usersController.toggleStatus(q, s, n));
router.post('/:id/reset-password', adminOnly, (q, s, n) => usersController.resetPassword(q, s, n));

export default router;