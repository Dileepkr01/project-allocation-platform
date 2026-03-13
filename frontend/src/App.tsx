// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PublicLayout } from '@/components/layout/PublicLayout';

// Public Pages
import HomePage from '@/pages/public/HomePage';
import AboutPage from '@/pages/public/AboutPage';
import HowItWorksPage from '@/pages/public/HowItWorksPage';
import ResultsPage from '@/pages/public/ResultsPage';
import FAQPage from '@/pages/public/FAQPage';
import ContactPage from '@/pages/public/ContactPage';
import NotFoundPage from '@/pages/public/NotFoundPage';

// Auth
import LoginPage from '@/pages/LoginPage';

// Dashboard Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageUsersPage from '@/pages/admin/ManageUsersPage';
import ManagePoolsPage from '@/pages/admin/ManagePoolsPage';
import PoolDetailPage from '@/pages/admin/PoolDetailPage';
import ReportsPage from '@/pages/admin/ReportsPage';
import AuditPage from '@/pages/admin/AuditPage';
import ReviewIdeasPage from '@/pages/admin/ReviewIdeasPage';
import FacultyDashboard from '@/pages/faculty/FacultyDashboard';
import StudentDashboard from '@/pages/student/StudentDashboard';
import BrowseProjectsPage from '@/pages/student/BrowseProjectsPage';
import MyTeamPage from '@/pages/student/MyTeamPage';
import IdeasPage from '@/pages/student/IdeasPage';
import ReviewPage from '@/pages/subadmin/ReviewPage';
import NotificationsPage from '@/pages/NotificationsPage';
import ProfilePage from '@/pages/ProfilePage';
import ChangePasswordPage from '@/pages/ChangePasswordPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  if (user?.mustResetPwd && window.location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }
  return <>{children}</>;
};

const DashboardRedirect: React.FC = () => {
  const { user } = useAuthStore();
  switch (user?.role) {
    case 'ADMIN': return <AdminDashboard />;
    case 'SUBADMIN': return <ReviewPage />;
    case 'FACULTY': return <FacultyDashboard />;
    case 'STUDENT': return <StudentDashboard />;
    default: return <AdminDashboard />;
  }
};

const App: React.FC = () => (
  <BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    <Routes>

      {/* ═══ PUBLIC ROUTES ═══ */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* ═══ AUTH ═══ */}
      <Route path="/login" element={<LoginPage />} />

      {/* ═══ PROTECTED DASHBOARD ROUTES ═══ */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Admin */}
        <Route path="/users" element={<ProtectedRoute roles={['ADMIN']}><ManageUsersPage /></ProtectedRoute>} />
        <Route path="/pools" element={<ProtectedRoute roles={['ADMIN', 'SUBADMIN']}><ManagePoolsPage /></ProtectedRoute>} />
        <Route path="/pools/:id" element={<ProtectedRoute roles={['ADMIN', 'SUBADMIN']}><PoolDetailPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute roles={['ADMIN', 'SUBADMIN']}><ReportsPage /></ProtectedRoute>} />
        <Route path="/audit" element={<ProtectedRoute roles={['ADMIN']}><AuditPage /></ProtectedRoute>} />
        <Route path="/student-ideas" element={<ProtectedRoute roles={['ADMIN']}><ReviewIdeasPage /></ProtectedRoute>} />

        {/* Subadmin */}
        <Route path="/review" element={<ProtectedRoute roles={['SUBADMIN']}><ReviewPage /></ProtectedRoute>} />

        {/* Faculty */}
        <Route path="/proposals" element={<ProtectedRoute roles={['FACULTY']}><FacultyDashboard /></ProtectedRoute>} />
        <Route path="/my-projects" element={<ProtectedRoute roles={['FACULTY']}><FacultyDashboard /></ProtectedRoute>} />

        {/* Student */}
        <Route path="/projects" element={<ProtectedRoute roles={['STUDENT']}><BrowseProjectsPage /></ProtectedRoute>} />
        <Route path="/my-team" element={<ProtectedRoute roles={['STUDENT']}><MyTeamPage /></ProtectedRoute>} />
        <Route path="/ideas" element={<ProtectedRoute roles={['STUDENT']}><IdeasPage /></ProtectedRoute>} />
      </Route>

      {/* ═══ 404 ═══ */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;