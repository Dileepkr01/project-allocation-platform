import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  LayoutDashboard, Users, FolderKanban, FileText, Bell,
  GraduationCap, BookOpen, ClipboardList, Lightbulb,
  UserCheck, BarChart3, Shield, LogOut, User, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems: Record<string, { label: string; path: string; icon: React.ReactNode }[]> = {
  ADMIN: [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Users', path: '/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Pools', path: '/pools', icon: <FolderKanban className="w-5 h-5" /> },
    { label: 'Student Ideas', path: '/student-ideas', icon: <Lightbulb className="w-5 h-5" /> },
    { label: 'Reports', path: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Audit Logs', path: '/audit', icon: <Shield className="w-5 h-5" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
  ],
  SUBADMIN: [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Review', path: '/review', icon: <ClipboardList className="w-5 h-5" /> },
    { label: 'Pools', path: '/pools', icon: <FolderKanban className="w-5 h-5" /> },
    { label: 'Reports', path: '/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
  ],
  FACULTY: [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Proposals', path: '/proposals', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Projects', path: '/my-projects', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
  ],
  STUDENT: [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Projects', path: '/projects', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'My Team', path: '/my-team', icon: <UserCheck className="w-5 h-5" /> },
    { label: 'Ideas', path: '/ideas', icon: <Lightbulb className="w-5 h-5" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="w-5 h-5" /> },
  ],
};

export const Sidebar: React.FC = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const items = navItems[user?.role || 'STUDENT'] || [];

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col fixed left-0 top-0 z-30">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600">ProjectAlloc</h1>
        <p className="text-xs text-gray-500 mt-1">Allocation Platform</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t space-y-2">
        <button onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="font-medium text-gray-900 truncate text-sm">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </button>

        <button onClick={() => { clearAuth(); window.location.href = '/login'; }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
};