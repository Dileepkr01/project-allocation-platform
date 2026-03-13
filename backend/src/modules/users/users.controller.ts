import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { parsePagination } from '../../shared/utils/pagination';
import { UserRole } from '@prisma/client';
import { BadRequestError } from '../../shared/errors/AppError';

export class UsersController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await usersService.createUser(req.body, req.user!.userId);
      res.status(201).json({ success: true, message: 'User created', data: result });
    } catch (e) { next(e); }
  }

  async bulkImport(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new BadRequestError('CSV file required');
      const result = await usersService.bulkImport(req.file, req.user!.userId);
      const code = result.status === 'COMPLETED' ? 201 : result.status === 'PARTIAL' ? 207 : 422;
      res.status(code).json({ success: result.status !== 'FAILED', message: `${result.successCount}/${result.totalRows} imported`, data: result });
    } catch (e) { next(e); }
  }

  async downloadTemplate(_req: Request, res: Response, next: NextFunction) {
    try {
      const csv = usersService.generateCsvTemplate();
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="import_template.csv"');
      res.send(csv);
    } catch (e) { next(e); }
  }

  async getImportHistory(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, ...await usersService.getImportHistory(parsePagination(req.query)) }); } catch (e) { next(e); }
  }

  async getImportJob(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await usersService.getImportJob(req.params.jobId as string) }); } catch (e) { next(e); }
  }

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { role: req.query.role as UserRole, department: req.query.department as string, search: req.query.search as string, isActive: req.query.isActive !== undefined ? req.query.isActive === 'true' : undefined };
      res.json({ success: true, ...await usersService.listUsers(filters, parsePagination(req.query)) });
    } catch (e) { next(e); }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await usersService.getUserById(req.params.id as string) }); } catch (e) { next(e); }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await usersService.updateUser(req.params.id as string, req.body) }); } catch (e) { next(e); }
  }

  async toggleStatus(req: Request, res: Response, next: NextFunction) {
    try { const u = await usersService.toggleStatus(req.params.id as string); res.json({ success: true, message: `User ${u.isActive ? 'activated' : 'deactivated'}`, data: u }); } catch (e) { next(e); }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, message: 'Password reset', data: await usersService.resetPassword(req.params.id as string) }); } catch (e) { next(e); }
  }

  async getStats(_req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await usersService.getStats() }); } catch (e) { next(e); }
  }
}

export const usersController = new UsersController();