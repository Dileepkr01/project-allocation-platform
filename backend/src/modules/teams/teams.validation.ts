import { z } from 'zod';

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
  }),
});

export const inviteSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    message: z.string().optional(),
  }),
});

export const respondInviteSchema = z.object({
  body: z.object({
    accept: z.boolean(),
  }),
});

export const selectProjectSchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
  }),
});