import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../shared/utils/token';
import { UnauthorizedError } from '../shared/errors/AppError';

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token required');
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, email: payload.email, role: payload.role as any };
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') next(new UnauthorizedError('Token expired'));
    else if (error.name === 'JsonWebTokenError') next(new UnauthorizedError('Invalid token'));
    else next(error);
  }
};