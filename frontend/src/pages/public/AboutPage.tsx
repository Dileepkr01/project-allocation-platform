// frontend/src/pages/public/AboutPage.tsx
import React from 'react';
import { Target, Eye, Code, Layers, Database, Palette, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const AboutPage: React.FC = () => {
  const revealRef = useScrollReveal();
  return (
    <div className="bg-cream-100 dark:bg-slate-950 transition-colors" ref={revealRef}>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-pink-300/20 dark:bg-violet-600/15 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-fuchsia-300/15 dark:bg-transparent rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-pink-100 dark:text-violet-400 uppercase tracking-wider mb-4 animate-fade-in-down"><Sparkles className="w-4 h-4" />About Us</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white animate-fade-in-up">About ProjectAlloc</h1>
          <p className="mt-6 text-lg text-rose-100 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            An automated project allocation platform designed to eliminate manual processes,
            reduce bias, and ensure every student gets a fair chance at selecting their preferred project.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cream-50 dark:bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 stagger-children">
          <div className="bg-blue-50 dark:bg-gradient-to-b dark:from-blue-500/10 dark:to-transparent border border-blue-200 dark:border-blue-500/20 rounded-3xl p-8">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/15 rounded-2xl flex items-center justify-center mb-5">
              <Target className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-4">Our Mission</h2>
            <p className="text-stone-600 dark:text-slate-400 leading-relaxed">
              To automate and streamline the project allocation process in educational institutions,
              eliminating manual overhead, preventing conflicts, and ensuring complete transparency
              from proposal submission to final team formation.
            </p>
          </div>
          <div className="bg-violet-50 dark:bg-gradient-to-b dark:from-violet-500/10 dark:to-transparent border border-violet-200 dark:border-violet-500/20 rounded-3xl p-8">
            <div className="w-14 h-14 bg-violet-100 dark:bg-violet-500/15 rounded-2xl flex items-center justify-center mb-5">
              <Eye className="w-7 h-7 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-white mb-4">Our Vision</h2>
            <p className="text-stone-600 dark:text-slate-400 leading-relaxed">
              A future where every university has access to a fair, transparent, and efficient
              project allocation system — where faculty can focus on mentoring and students can
              focus on building, not navigating bureaucracy.
            </p>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 border-t border-cream-300 dark:border-white/5 bg-cream-100 dark:bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-white text-center mb-12" data-reveal>Problems We Solve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { problem: 'Manual Allocation', solution: 'Fully automated pool-based system with defined phases' },
              { problem: 'Duplicate Selection', solution: 'Database-level locking prevents same project being selected twice' },
              { problem: 'Lack of Transparency', solution: 'Complete audit trail of every action taken by every user' },
              { problem: 'Unfair Distribution', solution: 'Students browse projects without seeing faculty names — pure merit' },
              { problem: 'Missed Deadlines', solution: 'Timeline enforcement blocks actions outside their designated phase' },
              { problem: 'Communication Gaps', solution: 'In-app + email notifications for every critical event' },
            ].map((item, i) => (
              <div key={i} data-reveal={`${i * 80}ms`} className="bg-cream-50 dark:bg-white/[0.03] border border-cream-300 dark:border-white/10 rounded-2xl p-6 hover:border-cream-400 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-none transition-all">
                <div className="text-red-500 dark:text-red-400 font-semibold text-sm mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 dark:bg-red-500/15 rounded flex items-center justify-center text-xs">✕</span>
                  {item.problem}
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-2">
                  <span className="w-5 h-5 bg-emerald-100 dark:bg-emerald-500/15 rounded flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                  {item.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 border-t border-cream-300 dark:border-white/5 bg-cream-50 dark:bg-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-white text-center mb-12" data-reveal>Built With Modern Technology</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Code className="w-5 h-5" />, label: 'Frontend', techs: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'], light: 'bg-blue-50 border-blue-200', dark: 'dark:bg-blue-500/10 dark:border-blue-500/20', iconC: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15' },
              { icon: <Layers className="w-5 h-5" />, label: 'Backend', techs: ['Node.js', 'Express', 'TypeScript', 'Prisma ORM'], light: 'bg-emerald-50 border-emerald-200', dark: 'dark:bg-emerald-500/10 dark:border-emerald-500/20', iconC: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15' },
              { icon: <Database className="w-5 h-5" />, label: 'Database', techs: ['PostgreSQL', 'Prisma Migrations', 'UUID Primary Keys'], light: 'bg-violet-50 border-violet-200', dark: 'dark:bg-violet-500/10 dark:border-violet-500/20', iconC: 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/15' },
              { icon: <Palette className="w-5 h-5" />, label: 'Features', techs: ['JWT Auth', 'Role-Based Access', 'Email (Nodemailer)', 'Audit Logging'], light: 'bg-amber-50 border-amber-200', dark: 'dark:bg-amber-500/10 dark:border-amber-500/20', iconC: 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15' },
            ].map(stack => (
              <div key={stack.label} data-reveal className={`rounded-2xl border p-6 text-center ${stack.light} ${stack.dark}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${stack.iconC}`}>{stack.icon}</div>
                <h3 className="font-semibold text-stone-800 dark:text-white mb-3">{stack.label}</h3>
                <ul className="space-y-1.5">
                  {stack.techs.map(t => <li key={t} className="text-sm text-stone-500 dark:text-slate-400">{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;