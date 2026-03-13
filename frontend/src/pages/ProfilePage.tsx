// frontend/src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { User as UserIcon, Mail, Phone, Building2, GraduationCap, Calendar, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authService.getMe().then(p => setProfile(p)).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!profile) return null;

  const fields = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: profile.email },
    { icon: <Building2 className="w-4 h-4" />, label: 'Department', value: profile.department || '—' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Enrollment', value: profile.enrollmentNo || '—', show: profile.role === 'STUDENT' },
    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: profile.phone || '—' },
    { icon: <Calendar className="w-4 h-4" />, label: 'Joined', value: new Date(profile.createdAt).toLocaleDateString() },
    { icon: <Calendar className="w-4 h-4" />, label: 'Last Login', value: profile.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString() : 'Never' },
  ].filter(f => f.show !== false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-2xl font-bold">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.firstName} {profile.lastName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge text={profile.role} />
              {profile.designation && <span className="text-sm text-gray-500">{profile.designation}</span>}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map(f => (
            <div key={f.label} className="flex items-center gap-3 py-2 border-b last:border-0">
              <span className="text-gray-400">{f.icon}</span>
              <span className="text-sm text-gray-500 w-28">{f.label}</span>
              <span className="text-sm font-medium text-gray-900">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/change-password')}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 text-gray-700">
        <Lock className="w-4 h-4" />Change Password
      </button>
    </div>
  );
};

export default ProfilePage;