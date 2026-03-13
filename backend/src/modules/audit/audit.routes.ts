import { Router } from 'express';
import { auditService } from './audit.service';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { parsePagination } from '../../shared/utils/pagination';

const router = Router();
router.use(authenticate, authorize('ADMIN'));

router.get('/', async (req, res, next) => {
  try {
    const params = parsePagination(req.query);
    const filters = { userId: req.query.userId as string, entityType: req.query.entityType as string, entityId: req.query.entityId as string };
    res.json({ success: true, ...await auditService.getLogs(params, filters) });
  } catch (e) { next(e); }
});

export default router;