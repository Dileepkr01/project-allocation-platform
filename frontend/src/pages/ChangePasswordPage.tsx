// frontend/src/pages/ChangePasswordPage.tsx
import React, { useState } from 'react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ChangePasswordPage: React.FC = () => {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirmPwd) { toast.error('Passwords do not match'); return; }
    if (newPwd.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(newPwd)) {
      toast.error('Password must contain uppercase, lowercase, number, and special character'); return;
    }

    setLoading(true);
    try {
      await authService.changePassword(oldPwd, newPwd);
      toast.success('Password changed! Please login again.');
      clearAuth();
      navigate('/login');
    } catch (e: any) { toast.error(e.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
          <p className="text-sm text-gray-500 mt-1">Please set a new secure password</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} required
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={newPwd} onChange={e => setNewPwd(e.target.value)} required
                className="w-full px-3 py-2 pr-10 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {[
                { test: newPwd.length >= 8, label: 'At least 8 characters' },
                { test: /[A-Z]/.test(newPwd), label: 'Uppercase letter' },
                { test: /[a-z]/.test(newPwd), label: 'Lowercase letter' },
                { test: /\d/.test(newPwd), label: 'Number' },
                { test: /[@$!%*?&#]/.test(newPwd), label: 'Special character (@$!%*?&#)' },
              ].map(r => (
                <p key={r.label} className={`text-xs flex items-center gap-1 ${r.test ? 'text-green-600' : 'text-gray-400'}`}>
                  {r.test ? '✓' : '○'} {r.label}
                </p>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} required
              className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            {confirmPwd && newPwd !== confirmPwd && <p className="text-xs text-red-500 mt-1">Passwords don't match</p>}
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;