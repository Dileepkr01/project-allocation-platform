import { Router } from 'express';
import { teamsController } from './teams.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validateRequest } from '../../middleware/validateRequest';
import { createTeamSchema, inviteSchema, respondInviteSchema, selectProjectSchema } from './teams.validation';

const router = Router();
router.use(authenticate);

// Student team operations
router.post('/:poolId/teams', authorize('STUDENT'), validateRequest(createTeamSchema), (q, s, n) => teamsController.create(q, s, n));
router.get('/:poolId/my-team', authorize('STUDENT'), (q, s, n) => teamsController.getMyTeam(q, s, n));
router.get('/:poolId/my-invites', authorize('STUDENT'), (q, s, n) => teamsController.getMyInvites(q, s, n));
router.post('/:poolId/teams/:teamId/invite', authorize('STUDENT'), validateRequest(inviteSchema), (q, s, n) => teamsController.invite(q, s, n));
router.post('/:poolId/invites/:inviteId/respond', authorize('STUDENT'), validateRequest(respondInviteSchema), (q, s, n) => teamsController.respond(q, s, n));
router.post('/:poolId/teams/:teamId/select-project', authorize('STUDENT'), validateRequest(selectProjectSchema), (q, s, n) => teamsController.selectProject(q, s, n));
router.post('/:poolId/teams/:teamId/leave', authorize('STUDENT'), (q, s, n) => teamsController.leave(q, s, n));
router.delete('/:poolId/teams/:teamId/members/:memberId', authorize('STUDENT'), (q, s, n) => teamsController.removeMember(q, s, n));
router.post('/:poolId/teams/:teamId/dissolve', authorize('STUDENT'), (q, s, n) => teamsController.dissolve(q, s, n));

// Admin/Subadmin/Faculty
router.get('/:poolId/teams', authorize('ADMIN', 'SUBADMIN', 'FACULTY'), (q, s, n) => teamsController.listByPool(q, s, n));

export default router;