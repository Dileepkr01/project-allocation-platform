// frontend/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  SUBMISSION_OPEN: 'bg-blue-100 text-blue-700',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-700',
  DECISION_PENDING: 'bg-orange-100 text-orange-700',
  SELECTION_OPEN: 'bg-green-100 text-green-700',
  TEAMS_FORMING: 'bg-purple-100 text-purple-700',
  FROZEN: 'bg-cyan-100 text-cyan-700',
  ARCHIVED: 'bg-gray-200 text-gray-500',
  SUBMITTED: 'bg-blue-100 text-blue-700',
  LOCKED: 'bg-green-100 text-green-700',
  ON_HOLD: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  FORMING: 'bg-blue-100 text-blue-700',
  COMPLETE: 'bg-green-100 text-green-700',
  DISSOLVED: 'bg-red-100 text-red-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  ACCEPTED: 'bg-green-100 text-green-700',
  DECLINED: 'bg-red-100 text-red-700',
  EXPIRED: 'bg-gray-100 text-gray-500',
  SUCCESS: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
  DUPLICATE: 'bg-yellow-100 text-yellow-700',
  INVALID: 'bg-red-100 text-red-700',
  STUDENT: 'bg-blue-100 text-blue-700',
  FACULTY: 'bg-purple-100 text-purple-700',
  SUBADMIN: 'bg-orange-100 text-orange-700',
  ADMIN: 'bg-red-100 text-red-700',
};

export const Badge = ({ text, className }: { text: string; className?: string }) => (
  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColors[text] || 'bg-gray-100 text-gray-700', className)}>{text}</span>
);