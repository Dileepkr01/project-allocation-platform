import React, { useEffect, useState } from 'react';
import { Users, FolderKanban, FileText, GraduationCap } from 'lucide-react';
import { userService } from '@/services/userService';
import { poolService } from '@/services/poolService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import ReviewPage from '../subadmin/ReviewPage';
import FacultyDashboard from '../faculty/FacultyDashboard';
import BrowseProjectsPage from '../student/BrowseProjectsPage';
import type { UserStats, Pool } from '@/types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'admin' | 'subadmin' | 'faculty' | 'student'>('admin');

  useEffect(() => {
    Promise.all([userService.getStats(), poolService.list()])
      .then(([s, p]) => { setStats(s); setPools(p.data || []); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Students', value: stats?.students || 0, icon: <GraduationCap className="w-6 h-6" />, color: 'bg-blue-500', path: '/users' },
    { label: 'Faculty', value: stats?.faculty || 0, icon: <FileText className="w-6 h-6" />, color: 'bg-purple-500', path: '/users' },
    { label: 'Active Pools', value: pools.filter(p => !['DRAFT', 'ARCHIVED'].includes(p.status)).length, icon: <FolderKanban className="w-6 h-6" />, color: 'bg-green-500', path: '/pools' },
    { label: 'Total Users', value: stats?.total || 0, icon: <Users className="w-6 h-6" />, color: 'bg-orange-500', path: '/users' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        
        <div className="flex p-1 bg-gray-100 rounded-lg space-x-1">
          {(['admin', 'subadmin', 'faculty', 'student'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors ${
                viewMode === mode ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'subadmin' && <ReviewPage />}
      {viewMode === 'faculty' && <FacultyDashboard />}
      {viewMode === 'student' && <BrowseProjectsPage />}

      {viewMode === 'admin' && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} onClick={() => navigate(c.path)} className="bg-white rounded-xl shadow-sm border p-5 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p>
              </div>
              <div className={`p-3 rounded-xl text-white ${c.color}`}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Pools</h2>
        {pools.length === 0 ? <p className="text-gray-500 text-sm">No pools created yet</p> : (
          <div className="space-y-3">
            {pools.slice(0, 5).map((pool) => (
              <div key={pool.id} onClick={() => navigate(`/pools/${pool.id}`)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer border">
                <div>
                  <p className="font-medium text-gray-900">{pool.name}</p>
                  <p className="text-sm text-gray-500">{pool.academicYear} • {pool.semester}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  pool.status === 'FROZEN' ? 'bg-cyan-100 text-cyan-700' :
                  pool.status === 'DRAFT' ? 'bg-gray-100 text-gray-700' :
                  'bg-green-100 text-green-700'
                }`}>{pool.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default AdminDashboard;