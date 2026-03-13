import { Request, Response, NextFunction } from 'express';
import { teamsService } from './teams.service';

export class TeamsController {
  async create(req: Request, res: Response, next: NextFunction) { try { res.status(201).json({ success: true, data: await teamsService.createTeam(req.params.poolId as string, req.user!.userId, req.body.name) }); } catch (e) { next(e); } }
  async invite(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: await teamsService.inviteMember(req.params.teamId as string, req.user!.userId, req.body.studentId, req.body.message) }); } catch (e) { next(e); } }
  async respond(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, ...await teamsService.respondToInvite(req.params.inviteId as string, req.user!.userId, req.body.accept) }); } catch (e) { next(e); } }
  async selectProject(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: await teamsService.selectProject(req.params.teamId as string, req.user!.userId, req.body.projectId) }); } catch (e) { next(e); } }
  async leave(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, ...await teamsService.leaveTeam(req.params.teamId as string, req.user!.userId) }); } catch (e) { next(e); } }
  async removeMember(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, ...await teamsService.removeMember(req.params.teamId as string, req.user!.userId, req.params.memberId as string) }); } catch (e) { next(e); } }
  async dissolve(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, ...await teamsService.dissolveTeam(req.params.teamId as string, req.user!.userId) }); } catch (e) { next(e); } }
  async listByPool(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: await teamsService.getTeamsByPool(req.params.poolId as string) }); } catch (e) { next(e); } }
  async getMyTeam(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: await teamsService.getMyTeam(req.params.poolId as string, req.user!.userId) }); } catch (e) { next(e); } }
  async getMyInvites(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: await teamsService.getMyInvites(req.params.poolId as string, req.user!.userId) }); } catch (e) { next(e); } }
}

export const teamsController = new TeamsController();