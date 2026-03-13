import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { parsePagination } from '../../shared/utils/pagination';

export class NotificationsController {
  async list(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, ...await notificationsService.getForUser(req.user!.userId, parsePagination(req.query)) }); } catch (e) { next(e); } }
  async markRead(req: Request, res: Response, next: NextFunction) { try { await notificationsService.markRead(req.params.id as string, req.user!.userId); res.json({ success: true }); } catch (e) { next(e); } }
  async markAllRead(req: Request, res: Response, next: NextFunction) { try { await notificationsService.markAllRead(req.user!.userId); res.json({ success: true }); } catch (e) { next(e); } }
  async unreadCount(req: Request, res: Response, next: NextFunction) { try { res.json({ success: true, data: { count: await notificationsService.getUnreadCount(req.user!.userId) } }); } catch (e) { next(e); } }
}

export const notificationsController = new NotificationsController();