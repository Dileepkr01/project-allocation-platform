import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();
router.use(authenticate);

router.get('/', (q, s, n) => notificationsController.list(q, s, n));
router.get('/unread-count', (q, s, n) => notificationsController.unreadCount(q, s, n));
router.put('/:id/read', (q, s, n) => notificationsController.markRead(q, s, n));
router.put('/read-all', (q, s, n) => notificationsController.markAllRead(q, s, n));

export default router;