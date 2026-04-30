// frontend/src/pages/public/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, FileText, Shield, Clock, CheckCircle2,
  ChevronRight, ArrowRight, Lock, BarChart3, Bell,
  BookOpen, ClipboardList, Lightbulb, LogIn, Mail, Sparkles
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const HomePage: React.FC = () => {
  const revealRef = useScrollReveal();

  return (
    <div className="bg-cream-100 dark:bg-slate-950 transition-colors" ref={revealRef}>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        {/* Ambient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-teal-300/15 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-blue-300/15 dark:bg-violet-600/20 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-300/10 dark:bg-indigo-600/10 rounded-full blur-[150px] animate-pulse-glow delay-500" />
        </div>
        {/* Grid pattern (dark only) */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm rounded-full text-teal-100 dark:text-blue-300 text-sm mb-8 animate-fade-in-down">
                <Sparkles className="w-4 h-4 text-teal-200 dark:text-blue-400 animate-bounce-subtle" />
                Automated Project Allocation
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-fade-in-up">
                Streamline Your
                <span className="block text-teal-200 dark:text-transparent dark:bg-gradient-to-r dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 dark:bg-clip-text animate-hero-gradient">Project Allocation</span>
              </h1>
              <p className="mt-8 text-lg text-blue-100 dark:text-slate-400 max-w-lg leading-relaxed animate-fade-in-up delay-200">
                A comprehensive platform that automates the entire project allocation lifecycle —
                from faculty proposals to student team formation. Built for universities that demand
                transparency, fairness, and efficiency.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
                <Link to="/login" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 dark:bg-gradient-to-r dark:from-blue-500 dark:to-violet-600 dark:text-white rounded-2xl font-semibold hover:bg-teal-50 dark:hover:from-blue-600 dark:hover:to-violet-700 transition-all shadow-2xl shadow-teal-900/25 dark:shadow-blue-500/25 hover:-translate-y-0.5">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/how-it-works" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 dark:bg-white/5 border border-white/25 dark:border-white/10 backdrop-blur text-white rounded-2xl font-semibold hover:bg-white/25 dark:hover:bg-white/10 transition-all">
                  How It Works <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 text-blue-100 dark:text-slate-400 text-sm animate-fade-in delay-600">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300 dark:text-emerald-400" />No manual allocation</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300 dark:text-emerald-400" />Fair distribution</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-300 dark:text-emerald-400" />Full audit trail</div>
              </div>
            </div>

            {/* Hero visual — Animated Workflow Card */}
            <div className="hidden lg:block animate-fade-in-right delay-300">
              <div className="bg-white/10 dark:bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/20 dark:border-white/10 p-7 space-y-3 shadow-2xl animate-float-slow">
                {[
                  { phase: 'Pool Created', icon: '📂', status: 'complete' },
                  { phase: 'Faculty Submits 4 Proposals', icon: '📝', status: 'complete' },
                  { phase: 'Subadmin Reviews (Lock 3, Hold 1)', icon: '🔍', status: 'complete' },
                  { phase: 'Admin Approves / Rejects', icon: '✅', status: 'active' },
                  { phase: 'Students Select & Form Teams', icon: '👥', status: 'pending' },
                  { phase: 'Teams Frozen — Allocation Done', icon: '🧊', status: 'pending' },
                ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all animate-stagger-in ${
                    step.status === 'complete' ? 'bg-green-500/15 dark:bg-emerald-500/10 border border-green-400/20 dark:border-emerald-500/20' :
                    step.status === 'active' ? 'bg-yellow-500/15 dark:bg-blue-500/10 border border-yellow-400/25 dark:border-blue-500/30 shadow-lg' :
                    'bg-white/5 dark:bg-white/[0.02] border border-white/10 dark:border-white/5'
                  }`} style={{ animationDelay: `${600 + i * 100}ms` }}>
                    <span className="text-xl">{step.icon}</span>
                    <span className={`text-sm font-medium flex-1 ${step.status === 'pending' ? 'text-blue-200/60 dark:text-slate-500' : 'text-white dark:text-slate-200'}`}>{step.phase}</span>
                    {step.status === 'complete' && <CheckCircle2 className="w-4 h-4 text-green-300 dark:text-emerald-400" />}
                    {step.status === 'active' && <span className="w-2.5 h-2.5 bg-yellow-300 dark:bg-blue-400 rounded-full animate-pulse shadow-lg" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider (light only) */}
        <div className="absolute bottom-0 left-0 right-0 dark:hidden">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L48 55C96 50 192 40 288 33.3C384 26.7 480 23.3 576 25C672 26.7 768 33.3 864 36.7C960 40 1056 40 1152 35C1248 30 1344 20 1392 15L1440 10V60H0Z" className="fill-cream-100"/></svg>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="py-12 border-y border-cream-300 dark:border-white/5 bg-cream-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children" data-reveal>
            {[
              { value: '500+', label: 'Students Served', icon: <GraduationCap className="w-5 h-5" />, color: 'text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10' },
              { value: '100+', label: 'Projects Allocated', icon: <FileText className="w-5 h-5" />, color: 'text-emerald-500 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10' },
              { value: '75+', label: 'Faculty Members', icon: <BookOpen className="w-5 h-5" />, color: 'text-violet-500 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10' },
              { value: '100%', label: 'Transparency', icon: <Shield className="w-5 h-5" />, color: 'text-amber-500 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10' },
            ].map(stat => (
              <div key={stat.label} className="text-center group hover-lift cursor-default">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                <p className="text-3xl font-bold text-stone-800 dark:text-white">{stat.value}</p>
                <p className="text-sm text-stone-500 dark:text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-24 bg-cream-100 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16" data-reveal>
            <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">Features</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-800 dark:text-white mt-3">Everything You Need</h2>
            <p className="mt-5 text-lg text-stone-500 dark:text-slate-400 max-w-2xl mx-auto">
              A complete solution covering every aspect of the project allocation process
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <ClipboardList className="w-5 h-5" />, title: 'Pool Management', desc: 'Admin creates allocation pools with configurable timelines, assigns faculty and students', light: 'bg-blue-50 border-blue-200 hover:shadow-blue-100', dark: 'dark:bg-gradient-to-b dark:from-blue-500/20 dark:to-blue-500/0 dark:border-blue-500/20', iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
              { icon: <FileText className="w-5 h-5" />, title: 'Proposal Submission', desc: 'Faculty submit exactly 4 project proposals within the set deadline', light: 'bg-violet-50 border-violet-200 hover:shadow-violet-100', dark: 'dark:bg-gradient-to-b dark:from-violet-500/20 dark:to-violet-500/0 dark:border-violet-500/20', iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
              { icon: <Shield className="w-5 h-5" />, title: 'Multi-Level Review', desc: 'Subadmin locks 3, holds 1 for admin. Admin makes final approve/reject decision', light: 'bg-emerald-50 border-emerald-200 hover:shadow-emerald-100', dark: 'dark:bg-gradient-to-b dark:from-emerald-500/20 dark:to-emerald-500/0 dark:border-emerald-500/20', iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
              { icon: <Users className="w-5 h-5" />, title: 'Team Formation', desc: 'Students browse approved projects, create teams, send invites, and select projects', light: 'bg-amber-50 border-amber-200 hover:shadow-amber-100', dark: 'dark:bg-gradient-to-b dark:from-amber-500/20 dark:to-amber-500/0 dark:border-amber-500/20', iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
              { icon: <Lock className="w-5 h-5" />, title: 'Race Condition Prevention', desc: 'Database-level locking ensures no two teams can select the same project', light: 'bg-red-50 border-red-200 hover:shadow-red-100', dark: 'dark:bg-gradient-to-b dark:from-red-500/20 dark:to-red-500/0 dark:border-red-500/20', iconBg: 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400' },
              { icon: <Lightbulb className="w-5 h-5" />, title: 'Student Ideas', desc: 'Students can submit their own project ideas. If approved, auto-assigned to their team', light: 'bg-yellow-50 border-yellow-200 hover:shadow-yellow-100', dark: 'dark:bg-gradient-to-b dark:from-yellow-500/20 dark:to-yellow-500/0 dark:border-yellow-500/20', iconBg: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400' },
              { icon: <Bell className="w-5 h-5" />, title: 'Notifications', desc: 'Real-time in-app and email notifications for every important event', light: 'bg-pink-50 border-pink-200 hover:shadow-pink-100', dark: 'dark:bg-gradient-to-b dark:from-pink-500/20 dark:to-pink-500/0 dark:border-pink-500/20', iconBg: 'bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400' },
              { icon: <BarChart3 className="w-5 h-5" />, title: 'Reports & Print', desc: 'Comprehensive reports with printable format and CSV export capabilities', light: 'bg-cyan-50 border-cyan-200 hover:shadow-cyan-100', dark: 'dark:bg-gradient-to-b dark:from-cyan-500/20 dark:to-cyan-500/0 dark:border-cyan-500/20', iconBg: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400' },
              { icon: <Clock className="w-5 h-5" />, title: 'Timeline Control', desc: 'Admin sets deadlines for each phase. System auto-enforces timeline restrictions', light: 'bg-indigo-50 border-indigo-200 hover:shadow-indigo-100', dark: 'dark:bg-gradient-to-b dark:from-indigo-500/20 dark:to-indigo-500/0 dark:border-indigo-500/20', iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400' },
            ].map((feature, i) => (
              <div key={feature.title} data-reveal={`${i * 80}ms`}
                className={`group rounded-2xl border p-6 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-default ${feature.light} ${feature.dark}`}>
                <div className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-stone-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ROLES ═══ */}
      <section className="py-24 border-t border-cream-300 dark:border-white/5 bg-cream-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16" data-reveal>
            <span className="text-sm font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-wider">Roles</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-800 dark:text-white mt-3">Four Roles, One Platform</h2>
            <p className="mt-5 text-lg text-stone-500 dark:text-slate-400">Each role has a tailored dashboard with specific capabilities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { role: 'Admin', color: 'from-red-500 to-rose-600', accent: 'border-red-200 dark:border-red-500/30 bg-cream-50 dark:bg-red-500/5', icon: <Shield className="w-7 h-7" />, features: ['Create allocation pools', 'Set timelines & phases', 'Manage all users', 'Approve/reject projects', 'Review student ideas', 'View reports & audit logs', 'Freeze teams'] },
              { role: 'Subadmin', color: 'from-amber-500 to-orange-600', accent: 'border-amber-200 dark:border-amber-500/30 bg-cream-50 dark:bg-amber-500/5', icon: <ClipboardList className="w-7 h-7" />, features: ['Review faculty proposals', 'Lock 3 proposals', 'Hold 1 for admin review', 'Track submission status', 'View pool statistics', 'Access reports'] },
              { role: 'Faculty', color: 'from-violet-500 to-purple-600', accent: 'border-violet-200 dark:border-violet-500/30 bg-cream-50 dark:bg-violet-500/5', icon: <BookOpen className="w-7 h-7" />, features: ['Submit 4 project proposals', 'Edit draft proposals', 'Track proposal status', 'View assigned teams', 'See student contacts', 'Guide project work'] },
              { role: 'Student', color: 'from-blue-500 to-cyan-600', accent: 'border-blue-200 dark:border-blue-500/30 bg-cream-50 dark:bg-blue-500/5', icon: <GraduationCap className="w-7 h-7" />, features: ['Browse approved projects', 'Create or join teams', 'Send/accept invites', 'Select project for team', 'Submit own ideas', 'View team details'] },
            ].map((r, i) => (
              <div key={r.role} data-reveal={`${i * 120}ms`}
                className={`rounded-2xl overflow-hidden border ${r.accent} shadow-sm dark:shadow-none hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 group`}>
                <div className={`bg-gradient-to-br ${r.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  <div className="relative z-10">
                    <div className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">{r.icon}</div>
                    <h3 className="text-xl font-bold mt-3">{r.role}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5">
                    {r.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
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
      <section className="py-24 bg-cream-100 dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6" data-reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 p-12 sm:p-16 text-center animate-gradient-x">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-20 -translate-y-20 animate-float" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-x-10 translate-y-10 animate-float delay-500" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-blue-100/80 max-w-xl mx-auto">
                Sign in to your account or contact the admin to get access to the platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-2xl font-semibold hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-0.5">
                  <LogIn className="w-5 h-5" />Sign In
                </Link>
                <Link to="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/20 transition-all">
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />Contact Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;