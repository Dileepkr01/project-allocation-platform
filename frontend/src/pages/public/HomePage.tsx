// frontend/src/pages/public/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, FileText, Shield, Clock, CheckCircle2,
  ChevronRight, ArrowRight, Zap, Lock, BarChart3, Bell,
  BookOpen, ClipboardList, UserCheck, Lightbulb, Star, LogIn, Mail
} from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-blue-100 text-sm mb-6">
                <Zap className="w-4 h-4" />
                Automated Project Allocation
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Streamline Your
                <span className="block text-blue-200">Project Allocation</span>
              </h1>
              <p className="mt-6 text-lg text-blue-100 max-w-lg leading-relaxed">
                A comprehensive platform that automates the entire project allocation lifecycle — 
                from faculty proposals to student team formation. Built for universities that demand 
                transparency, fairness, and efficiency.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
                  How It Works <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-8 text-blue-200 text-sm">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" />No manual allocation</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" />Fair distribution</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" />Full audit trail</div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 space-y-4">
                {[
                  { phase: 'Pool Created', icon: '📂', status: 'complete' },
                  { phase: 'Faculty Submits 4 Proposals', icon: '📝', status: 'complete' },
                  { phase: 'Subadmin Reviews (Lock 3, Hold 1)', icon: '🔍', status: 'complete' },
                  { phase: 'Admin Approves / Rejects', icon: '✅', status: 'active' },
                  { phase: 'Students Select & Form Teams', icon: '👥', status: 'pending' },
                  { phase: 'Teams Frozen — Allocation Done', icon: '🧊', status: 'pending' },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    step.status === 'complete' ? 'bg-green-500/20 text-green-100' :
                    step.status === 'active' ? 'bg-yellow-500/20 text-yellow-100 ring-2 ring-yellow-400/50' :
                    'bg-white/5 text-blue-200'
                  }`}>
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-sm font-medium flex-1">{step.phase}</span>
                    {step.status === 'complete' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    {step.status === 'active' && <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 60L48 55C96 50 192 40 288 33.3C384 26.7 480 23.3 576 25C672 26.7 768 33.3 864 36.7C960 40 1056 40 1152 35C1248 30 1344 20 1392 15L1440 10V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="white"/></svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Students Served', icon: <GraduationCap className="w-6 h-6 text-blue-500" /> },
              { value: '100+', label: 'Projects Allocated', icon: <FileText className="w-6 h-6 text-green-500" /> },
              { value: '75+', label: 'Faculty Members', icon: <BookOpen className="w-6 h-6 text-purple-500" /> },
              { value: '100%', label: 'Transparency', icon: <Shield className="w-6 h-6 text-orange-500" /> },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              A complete solution covering every aspect of the project allocation process
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <ClipboardList className="w-6 h-6" />, title: 'Pool Management', desc: 'Admin creates allocation pools with configurable timelines, assigns faculty and students', color: 'bg-blue-100 text-blue-600' },
              { icon: <FileText className="w-6 h-6" />, title: 'Proposal Submission', desc: 'Faculty submit exactly 4 project proposals within the set deadline', color: 'bg-purple-100 text-purple-600' },
              { icon: <Shield className="w-6 h-6" />, title: 'Multi-Level Review', desc: 'Subadmin locks 3, holds 1 for admin. Admin makes final approve/reject decision', color: 'bg-green-100 text-green-600' },
              { icon: <Users className="w-6 h-6" />, title: 'Team Formation', desc: 'Students browse approved projects, create teams, send invites, and select projects', color: 'bg-orange-100 text-orange-600' },
              { icon: <Lock className="w-6 h-6" />, title: 'Race Condition Prevention', desc: 'Database-level locking ensures no two teams can select the same project', color: 'bg-red-100 text-red-600' },
              { icon: <Lightbulb className="w-6 h-6" />, title: 'Student Ideas', desc: 'Students can submit their own project ideas. If approved, auto-assigned to their team', color: 'bg-yellow-100 text-yellow-600' },
              { icon: <Bell className="w-6 h-6" />, title: 'Notifications', desc: 'Real-time in-app and email notifications for every important event', color: 'bg-pink-100 text-pink-600' },
              { icon: <BarChart3 className="w-6 h-6" />, title: 'Reports & Print', desc: 'Comprehensive reports with printable format and CSV export capabilities', color: 'bg-cyan-100 text-cyan-600' },
              { icon: <Clock className="w-6 h-6" />, title: 'Timeline Control', desc: 'Admin sets deadlines for each phase. System auto-enforces timeline restrictions', color: 'bg-indigo-100 text-indigo-600' },
            ].map(feature => (
              <div key={feature.title} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROLES ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Four Roles, One Platform</h2>
            <p className="mt-4 text-lg text-gray-500">Each role has a tailored dashboard with specific capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: 'Admin',
                color: 'from-red-500 to-red-600',
                icon: <Shield className="w-8 h-8" />,
                features: ['Create allocation pools', 'Set timelines & phases', 'Manage all users', 'Approve/reject projects', 'Review student ideas', 'View reports & audit logs', 'Freeze teams'],
              },
              {
                role: 'Subadmin',
                color: 'from-orange-500 to-orange-600',
                icon: <ClipboardList className="w-8 h-8" />,
                features: ['Review faculty proposals', 'Lock 3 proposals', 'Hold 1 for admin review', 'Track submission status', 'View pool statistics', 'Access reports'],
              },
              {
                role: 'Faculty',
                color: 'from-purple-500 to-purple-600',
                icon: <BookOpen className="w-8 h-8" />,
                features: ['Submit 4 project proposals', 'Edit draft proposals', 'Track proposal status', 'View assigned teams', 'See student contacts', 'Guide project work'],
              },
              {
                role: 'Student',
                color: 'from-blue-500 to-blue-600',
                icon: <GraduationCap className="w-8 h-8" />,
                features: ['Browse approved projects', 'Create or join teams', 'Send/accept invites', 'Select project for team', 'Submit own ideas', 'View team details'],
              },
            ].map(r => (
              <div key={r.role} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className={`bg-gradient-to-br ${r.color} p-6 text-white`}>
                  {r.icon}
                  <h3 className="text-xl font-bold mt-3">{r.role}</h3>
                </div>
                <div className="bg-white p-6">
                  <ul className="space-y-2">
                    {r.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-blue-100">
            Sign in to your account or contact the admin to get access to the platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
              <LogIn className="w-5 h-5" />Sign In
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20">
              <Mail className="w-5 h-5" />Contact Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;