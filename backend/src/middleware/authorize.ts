import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { ForbiddenError } from '../shared/errors/AppError';

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new ForbiddenError('Authentication required');
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(`Access denied. Required: ${roles.join(', ')}`);
    }
    next();
  };
};