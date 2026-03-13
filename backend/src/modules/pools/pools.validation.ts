import { z } from 'zod';

export const createPoolSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    academicYear: z.string().min(4),
    semester: z.string().min(1),
    department: z.string().optional(),
    submissionStart: z.string().datetime(),
    submissionEnd: z.string().datetime(),
    reviewStart: z.string().datetime(),
    reviewEnd: z.string().datetime(),
    decisionDeadline: z.string().datetime(),
    selectionStart: z.string().datetime(),
    selectionEnd: z.string().datetime(),
    teamFreezeDate: z.string().datetime(),
    minTeamSize: z.number().int().min(2).max(5).optional().default(3),
    defaultMaxTeamSize: z.number().int().min(2).max(5).optional().default(3),
    allowStudentIdeas: z.boolean().optional().default(true),
    subadminIds: z.array(z.string().uuid()).min(1, 'At least 1 subadmin'),
    facultyIds: z.array(z.string().uuid()).min(1, 'At least 1 faculty'),
    studentIds: z.array(z.string().uuid()).min(1, 'At least 1 student'),
  }).refine(d => new Date(d.submissionStart) < new Date(d.submissionEnd), { message: 'submissionStart must be before submissionEnd' })
    .refine(d => new Date(d.submissionEnd) <= new Date(d.reviewStart), { message: 'submissionEnd must be before/equal reviewStart' })
    .refine(d => new Date(d.reviewEnd) <= new Date(d.decisionDeadline), { message: 'reviewEnd must be before decisionDeadline' })
    .refine(d => new Date(d.selectionStart) < new Date(d.selectionEnd), { message: 'selectionStart must be before selectionEnd' })
    .refine(d => new Date(d.selectionEnd) <= new Date(d.teamFreezeDate), { message: 'selectionEnd must be before teamFreezeDate' }),
});

export const updatePoolSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    submissionStart: z.string().datetime().optional(),
    submissionEnd: z.string().datetime().optional(),
    reviewStart: z.string().datetime().optional(),
    reviewEnd: z.string().datetime().optional(),
    decisionDeadline: z.string().datetime().optional(),
    selectionStart: z.string().datetime().optional(),
    selectionEnd: z.string().datetime().optional(),
    teamFreezeDate: z.string().datetime().optional(),
    minTeamSize: z.number().int().min(2).max(5).optional(),
    defaultMaxTeamSize: z.number().int().min(2).max(5).optional(),
    allowStudentIdeas: z.boolean().optional(),
  }),
});

export const assignUsersSchema = z.object({
  body: z.object({
    subadminIds: z.array(z.string().uuid()).optional(),
    facultyIds: z.array(z.string().uuid()).optional(),
    studentIds: z.array(z.string().uuid()).optional(),
  }),
});