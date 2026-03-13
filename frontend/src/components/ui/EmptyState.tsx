// frontend/src/components/ui/EmptyState.tsx
import { FileX } from 'lucide-react';

export const EmptyState = ({ title = 'No data', subtitle = '' }: { title?: string; subtitle?: string }) => (
  <div className="text-center py-16">
    <FileX className="w-12 h-12 mx-auto mb-3 text-gray-300" />
    <p className="text-gray-600 font-medium">{title}</p>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
  </div>
);