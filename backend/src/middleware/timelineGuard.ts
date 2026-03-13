import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { ForbiddenError, NotFoundError } from '../shared/errors/AppError';

type Phase = 'SUBMISSION' | 'REVIEW' | 'DECISION' | 'SELECTION' | 'TEAM_FORM';

export const timelineGuard = (requiredPhase: Phase) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const poolId = req.params.poolId as string | undefined;
      if (!poolId) return next();

      const pool = await prisma.pool.findUnique({ where: { id: poolId } });
      if (!pool) throw new NotFoundError('Pool not found');

      const now = new Date();

      const windows: Record<Phase, { start: Date; end: Date }> = {
        SUBMISSION: { start: pool.submissionStart, end: pool.submissionEnd },
        REVIEW: { start: pool.reviewStart, end: pool.reviewEnd },
        DECISION: { start: pool.reviewEnd, end: pool.decisionDeadline },
        SELECTION: { start: pool.selectionStart, end: pool.selectionEnd },
        TEAM_FORM: { start: pool.selectionStart, end: pool.teamFreezeDate },
      };

      const window = windows[requiredPhase];
      if (now < window.start) {
        throw new ForbiddenError(`This phase hasn't started yet. Starts: ${window.start.toISOString()}`);
      }
      if (now > window.end) {
        throw new ForbiddenError(`This phase has ended. Ended: ${window.end.toISOString()}`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};