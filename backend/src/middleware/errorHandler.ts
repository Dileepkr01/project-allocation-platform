import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../shared/errors/AppError';
import { logger } from '../shared/utils/logger';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({ success: false, code: err.code, message: err.message, errors: err.errors });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const fields = (err.meta?.target as string[]) || ['field'];
      res.status(409).json({ success: false, code: 'DUPLICATE', message: `Duplicate: ${fields.join(', ')}` });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ success: false, code: 'NOT_FOUND', message: 'Record not found' });
      return;
    }
  }

  res.status(500).json({
    success: false,
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
};