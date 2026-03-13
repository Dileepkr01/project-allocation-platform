// frontend/src/components/ui/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Loading...' }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    <p className="mt-3 text-gray-500 text-sm">{text}</p>
  </div>
);