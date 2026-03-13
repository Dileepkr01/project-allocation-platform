import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../shared/errors/AppError';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        error.issues.forEach((e) => {
          const path = e.path.slice(1).join('.');
          if (!errors[path]) errors[path] = [];
          errors[path].push(e.message);
        });
        next(new ValidationError('Validation failed', errors));
      } else {
        next(error);
      }
    }
  };
};