// frontend/src/components/layout/PublicLayout.tsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import {
  GraduationCap, Menu, X, ChevronRight, LogIn,
  LayoutDashboard, Github, Mail, Phone, MapPin
} from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Results', path: '/results' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── HEADER ── */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Project<span className="text-blue-600">Alloc</span></span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                  <LayoutDashboard className="w-4 h-4" />Dashboard
                </Link>
              ) : (
                <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                  <LogIn className="w-4 h-4" />Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="md:hidden py-4 border-t space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    location.pathname === link.path ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t mt-2">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-blue-600">Go to Dashboard</Link>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-blue-600">Sign In</Link>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">ProjectAlloc</span>
              </div>
              <p className="text-sm leading-relaxed max-w-md">
                An automated project allocation platform designed for universities.
                Streamlines the entire process from proposal submission to team formation,
                ensuring fair and transparent project distribution.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="mailto:support@university.edu" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>support@iul.ac.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91 123 456 7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span>Department of CSE,<br />Integral University, Lucknow</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© {new Date().getFullYear()} ProjectAlloc. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};