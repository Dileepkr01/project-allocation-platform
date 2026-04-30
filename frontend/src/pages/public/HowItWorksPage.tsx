// frontend/src/pages/public/HowItWorksPage.tsx
import React from 'react';
import { FolderKanban, FileText, ClipboardList, CheckCircle2, Users, Snowflake, Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  { phase: 'Phase 1', title: 'Pool Creation', icon: <FolderKanban className="w-6 h-6" />, color: 'from-blue-500 to-blue-600', role: 'Admin', points: ['Admin creates a new allocation pool (e.g., "FYP 2026 Spring")', 'Sets timeline: submission window, review period, selection dates, freeze date', 'Assigns subadmin(s), faculty, and eligible students to the pool', 'Activates the pool to open submissions'] },
  { phase: 'Phase 2', title: 'Faculty Proposal Submission', icon: <FileText className="w-6 h-6" />, color: 'from-violet-500 to-purple-600', role: 'Faculty', points: ['Each faculty submits exactly 4 project proposals', 'Proposals include title, description, domain, prerequisites, and max team size', 'Faculty can edit drafts before finalizing', 'Once finalized, all 4 proposals are locked for review'] },
  { phase: 'Phase 3', title: 'Subadmin Review', icon: <ClipboardList className="w-6 h-6" />, color: 'from-amber-500 to-orange-600', role: 'Subadmin', points: ['Subadmin reviews each faculty\'s 4 proposals', 'Locks (approves) 3 proposals at subadmin level', 'Places 1 proposal on hold — escalated to admin for final decision', 'Can add review notes for each proposal'] },
  { phase: 'Phase 4', title: 'Admin Decision', icon: <CheckCircle2 className="w-6 h-6" />, color: 'from-emerald-500 to-green-600', role: 'Admin', points: ['Admin sees only ON_HOLD proposals', 'Approves or rejects each held project with optional feedback', 'Can batch-approve all locked projects', 'Approved projects become visible to students'] },
  { phase: 'Phase 5', title: 'Student Selection & Team Formation', icon: <Users className="w-6 h-6" />, color: 'from-indigo-500 to-blue-600', role: 'Student', points: ['Students browse approved projects (without faculty names for fairness)', 'One student creates a team and becomes the leader', 'Leader invites team members (min 3, max configurable per project)', 'Team leader selects one project — first come, first served with DB locking', 'Students can also submit their own project ideas for admin approval'] },
  { phase: 'Phase 6', title: 'Freeze & Finalize', icon: <Snowflake className="w-6 h-6" />, color: 'from-cyan-500 to-teal-600', role: 'Admin', points: ['Admin freezes the pool after the deadline', 'All teams are frozen — no further changes allowed', 'Faculty can now see their assigned teams and student contact details', 'Admin generates reports (printable + CSV export)', 'Audit logs record every action for accountability'] },
];

const roleColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
    case 'Faculty': return 'text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20';
    case 'Subadmin': return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
    case 'Student': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
    default: return 'text-stone-600 dark:text-slate-400 bg-cream-200 dark:bg-slate-500/10 border-cream-300 dark:border-slate-500/20';
  }
};

const HowItWorksPage: React.FC = () => {
  const revealRef = useScrollReveal();
  return (
    <div className="bg-cream-100 dark:bg-slate-950 transition-colors" ref={revealRef}>
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-emerald-300/20 dark:bg-indigo-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-teal-300/15 dark:bg-transparent rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 dark:text-indigo-400 uppercase tracking-wider mb-4 animate-fade-in-down"><Sparkles className="w-4 h-4" />Process</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white animate-fade-in-up">How It Works</h1>
          <p className="mt-6 text-lg text-teal-100 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            A 6-phase lifecycle that takes your project allocation from pool creation to final team freeze
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.phase} className="flex gap-6" data-reveal={`${i * 150}ms`}>
              <div className="flex flex-col items-center">
                <div className={`relative w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-gray-300 dark:from-white/20 to-transparent my-3 min-h-[40px]" />
                )}
              </div>
              <div className="flex-1 pb-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-stone-400 dark:text-slate-500 uppercase tracking-wider">{step.phase}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${roleColor(step.role)}`}>{step.role}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-800 dark:text-white mb-4">{step.title}</h3>
                <ul className="space-y-2.5">
                  {step.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;