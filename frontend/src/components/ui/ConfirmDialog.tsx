// frontend/src/components/ui/ConfirmDialog.tsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<Props> = ({ open, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger', onConfirm, onCancel }) => {
  if (!open) return null;
  const btnColor = variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : variant === 'warning' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className={`w-6 h-6 mt-0.5 ${variant === 'danger' ? 'text-red-500' : 'text-yellow-500'}`} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
          <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50">{cancelText}</button>
          <button onClick={onConfirm} className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${btnColor}`}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};