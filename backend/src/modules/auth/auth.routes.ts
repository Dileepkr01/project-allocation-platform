import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/authenticate';
import { validateRequest } from '../../middleware/validateRequest';
import { loginSchema, changePasswordSchema } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(loginSchema), (req, res, next) => authController.login(req, res, next));
router.post('/refresh', (req, res, next) => authController.refresh(req, res, next));
router.post('/logout', authenticate, (req, res, next) => authController.logout(req, res, next));
router.get('/me', authenticate, (req, res, next) => authController.getMe(req, res, next));
router.put('/change-password', authenticate, validateRequest(changePasswordSchema), (req, res, next) => authController.changePassword(req, res, next));

export default router;