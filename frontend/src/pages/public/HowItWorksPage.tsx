// frontend/src/pages/public/HowItWorksPage.tsx
import React from 'react';
import { FolderKanban, FileText, ClipboardList, CheckCircle2, Users, Snowflake, ArrowDown } from 'lucide-react';

const steps = [
  {
    phase: 'Phase 1',
    title: 'Pool Creation',
    icon: <FolderKanban className="w-8 h-8" />,
    color: 'bg-blue-500',
    role: 'Admin',
    points: [
      'Admin creates a new allocation pool (e.g., "FYP 2026 Spring")',
      'Sets timeline: submission window, review period, selection dates, freeze date',
      'Assigns subadmin(s), faculty, and eligible students to the pool',
      'Activates the pool to open submissions',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Faculty Proposal Submission',
    icon: <FileText className="w-8 h-8" />,
    color: 'bg-purple-500',
    role: 'Faculty',
    points: [
      'Each faculty submits exactly 4 project proposals',
      'Proposals include title, description, domain, prerequisites, and max team size',
      'Faculty can edit drafts before finalizing',
      'Once finalized, all 4 proposals are locked for review',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Subadmin Review',
    icon: <ClipboardList className="w-8 h-8" />,
    color: 'bg-orange-500',
    role: 'Subadmin',
    points: [
      'Subadmin reviews each faculty\'s 4 proposals',
      'Locks (approves) 3 proposals at subadmin level',
      'Places 1 proposal on hold — escalated to admin for final decision',
      'Can add review notes for each proposal',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Admin Decision',
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: 'bg-green-500',
    role: 'Admin',
    points: [
      'Admin sees only ON_HOLD proposals',
      'Approves or rejects each held project with optional feedback',
      'Can batch-approve all locked projects',
      'Approved projects become visible to students',
    ],
  },
  {
    phase: 'Phase 5',
    title: 'Student Selection & Team Formation',
    icon: <Users className="w-8 h-8" />,
    color: 'bg-indigo-500',
    role: 'Student',
    points: [
      'Students browse approved projects (without faculty names for fairness)',
      'One student creates a team and becomes the leader',
      'Leader invites team members (min 3, max configurable per project)',
      'Team leader selects one project — first come, first served with DB locking',
      'Students can also submit their own project ideas for admin approval',
    ],
  },
  {
    phase: 'Phase 6',
    title: 'Freeze & Finalize',
    icon: <Snowflake className="w-8 h-8" />,
    color: 'bg-cyan-500',
    role: 'Admin',
    points: [
      'Admin freezes the pool after the deadline',
      'All teams are frozen — no further changes allowed',
      'Faculty can now see their assigned teams and student contact details',
      'Admin generates reports (printable + CSV export)',
      'Audit logs record every action for accountability',
    ],
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">How It Works</h1>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
            A 6-phase lifecycle that takes your project allocation from pool creation to final team freeze
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-2">
            {steps.map((step, i) => (
              <React.Fragment key={step.phase}>
                <div className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 my-2 min-h-[40px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{step.phase}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        step.role === 'Admin' ? 'bg-red-100 text-red-700' :
                        step.role === 'Faculty' ? 'bg-purple-100 text-purple-700' :
                        step.role === 'Subadmin' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>{step.role}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;