// frontend/src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Users, FolderKanban, FileText, GraduationCap, Shield,
  TrendingUp, ArrowUpRight, Activity, Clock, Eye
} from 'lucide-react';
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

  const activePools = pools.filter(p => !['DRAFT', 'ARCHIVED'].includes(p.status)).length;

  const cards = [
    { label: 'Total Students', value: stats?.students || 0, icon: <GraduationCap className="w-5 h-5" />, change: '+12%', color: 'from-blue-500 to-blue-600', path: '/users' },
    { label: 'Faculty Members', value: stats?.faculty || 0, icon: <FileText className="w-5 h-5" />, change: '+3%', color: 'from-violet-500 to-purple-600', path: '/users' },
    { label: 'Active Pools', value: activePools, icon: <FolderKanban className="w-5 h-5" />, change: `${pools.length} total`, color: 'from-emerald-500 to-green-600', path: '/pools' },
    { label: 'Total Users', value: stats?.total || 0, icon: <Users className="w-5 h-5" />, change: `${stats?.active || 0} active`, color: 'from-amber-500 to-orange-600', path: '/users' },
  ];

  const statusColor = (s: string) => {
    switch (s) {
      case 'FROZEN': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'DRAFT': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      case 'SUBMISSION_OPEN': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'UNDER_REVIEW': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 dark:text-white">Command Center</h1>
          <p className="text-sm text-stone-500 dark:text-slate-400 mt-0.5">System-wide overview and management</p>
        </div>
        <div className="flex p-1 bg-cream-200 dark:bg-slate-800 rounded-xl gap-1">
          {(['admin', 'subadmin', 'faculty', 'student'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20'
                  : 'text-stone-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'subadmin' && <ReviewPage />}
      {viewMode === 'faculty' && <FacultyDashboard />}
      {viewMode === 'student' && <BrowseProjectsPage />}

      {viewMode === 'admin' && (
        <>
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white animate-fade-in-up">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl -translate-x-10 translate-y-10" />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300 uppercase tracking-wider">Administration</span>
                </div>
                <h2 className="text-3xl font-bold">Platform Overview</h2>
                <p className="text-slate-300 mt-2 max-w-md">
                  {activePools} active pool{activePools !== 1 ? 's' : ''} running with {stats?.total || 0} registered users across the platform.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center">
                  <p className="text-2xl font-bold">{stats?.active || 0}</p>
                  <p className="text-xs text-slate-300 mt-0.5">Active</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3 text-center">
                  <p className="text-2xl font-bold">{stats?.inactive || 0}</p>
                  <p className="text-xs text-slate-300 mt-0.5">Inactive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {cards.map(c => (
              <div
                key={c.label}
                onClick={() => navigate(c.path)}
                className="group relative overflow-hidden bg-cream-50 dark:bg-slate-800 rounded-2xl border border-cream-300 dark:border-slate-700 p-5 cursor-pointer hover:shadow-xl hover:shadow-cream-300/50 dark:hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-500 dark:text-slate-400">{c.label}</p>
                    <p className="text-3xl font-bold text-stone-800 dark:text-white mt-2">{c.value}</p>
                    <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">{c.change}</span>
                    </p>
                  </div>
                  <div className={`bg-gradient-to-br ${c.color} p-3 rounded-xl text-white shadow-lg`}>
                    {c.icon}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity ${c.color}" />
              </div>
            ))}
          </div>

          {/* Recent Pools */}
          <div className="bg-cream-50 dark:bg-slate-800 rounded-2xl border border-cream-300 dark:border-slate-700 overflow-hidden animate-fade-in-up delay-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cream-200 dark:bg-slate-700 rounded-lg">
                  <Activity className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <h2 className="text-lg font-semibold text-stone-800 dark:text-white">Recent Pools</h2>
              </div>
              <button onClick={() => navigate('/pools')} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            {pools.length === 0 ? (
              <p className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">No pools created yet</p>
            ) : (
              <div className="divide-y divide-cream-200 dark:divide-slate-700">
                {pools.slice(0, 5).map(pool => (
                  <div
                    key={pool.id}
                    onClick={() => navigate(`/pools/${pool.id}`)}
                    className="flex items-center justify-between px-6 py-4 hover:bg-cream-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cream-200 to-cream-300 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
                        <FolderKanban className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{pool.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <p className="text-xs text-stone-500 dark:text-slate-400">{pool.academicYear} • {pool.semester}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${statusColor(pool.status)}`}>
                        {pool.status.replace('_', ' ')}
                      </span>
                      <Eye className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
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