import { Request, Response, NextFunction } from 'express';
import { auditService } from '../modules/audit/audit.service';

export const auditLog = (action: string, entityType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.json.bind(res);

    res.json = function (data: any) {
      // Only log successful mutations
      if (res.statusCode < 400 && req.user) {
        const entityId = req.params.id || req.params.projectId || req.params.teamId || req.params.poolId || data?.data?.id;

        auditService.log(
          req.user.userId,
          action,
          entityType,
          entityId,
          undefined,
          req.body,
          req.ip,
          req.get('User-Agent')
        ).catch(() => {}); // fire and forget
      }

      return originalSend(data);
    };

    next();
  };
};