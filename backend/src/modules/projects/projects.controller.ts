import { Request, Response, NextFunction } from 'express';
import { projectsService } from './projects.service';

export class ProjectsController {
  async submit(req: Request, res: Response, next: NextFunction) {
    try { res.status(201).json({ success: true, data: await projectsService.submitProposal(req.params.poolId as string, req.user!.userId, req.body) }); } catch (e) { next(e); }
  }
  async finalize(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, ...await projectsService.finalizeSubmission(req.params.poolId as string, req.user!.userId) }); } catch (e) { next(e); }
  }
  async edit(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.editProposal(req.params.projectId as string, req.user!.userId, req.body) }); } catch (e) { next(e); }
  }
  async remove(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, ...await projectsService.deleteProposal(req.params.projectId as string, req.user!.userId) }); } catch (e) { next(e); }
  }
  async lock(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.lockProject(req.params.projectId as string, req.user!.userId, req.body.note) }); } catch (e) { next(e); }
  }
  async hold(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.holdProject(req.params.projectId as string, req.user!.userId, req.body.note) }); } catch (e) { next(e); }
  }
  async reviewBatch(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, ...await projectsService.reviewFacultyProposals(req.params.poolId as string, req.params.facultyId as string, req.user!.userId, req.body.decisions) }); } catch (e) { next(e); }
  }
  async approve(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.approveProject(req.params.projectId as string, req.user!.userId, req.body.note) }); } catch (e) { next(e); }
  }
  async reject(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.rejectProject(req.params.projectId as string, req.user!.userId, req.body.note) }); } catch (e) { next(e); }
  }
  async approveAllLocked(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, ...await projectsService.approveAllLocked(req.params.poolId as string, req.user!.userId) }); } catch (e) { next(e); }
  }
  async listByPool(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.getProjectsByPool(req.params.poolId as string, req.user!.userId, req.user!.role) }); } catch (e) { next(e); }
  }
  async getHeld(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.getHeldProjects(req.params.poolId as string) }); } catch (e) { next(e); }
  }
  async getFacultyStatus(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.getFacultySubmissions(req.params.poolId as string) }); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await projectsService.getProjectById(req.params.projectId as string) }); } catch (e) { next(e); }
  }
}

export const projectsController = new ProjectsController();