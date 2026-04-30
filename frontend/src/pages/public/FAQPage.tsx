// frontend/src/pages/public/FAQPage.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';

const faqs = [
  { category: 'General', questions: [
    { q: 'What is ProjectAlloc?', a: 'ProjectAlloc is an automated project allocation platform designed for universities. It manages the entire lifecycle from faculty proposal submission to student team formation and project selection.' },
    { q: 'Who can use this platform?', a: 'The platform supports four roles: Admin (manages everything), Subadmin (reviews proposals), Faculty (submits project proposals), and Students (form teams and select projects).' },
    { q: 'How do I get an account?', a: 'Accounts are created by the Admin only. There is no self-registration. The Admin either creates accounts manually or imports them via CSV. You\'ll receive your credentials from your department.' },
  ]},
  { category: 'For Students', questions: [
    { q: 'Can I see which faculty proposed a project?', a: 'No. To ensure fairness, students only see project titles, descriptions, domains, and prerequisites — not the faculty name. Faculty names are revealed only after teams are frozen.' },
    { q: 'How do I form a team?', a: 'One student creates a team and becomes the leader. The leader then invites other students. Each team needs a minimum of 3 members (configurable by admin). Maximum is usually 3, but some projects allow 4.' },
    { q: 'Can I be in multiple teams?', a: 'No. You can only be an active member of one team per pool. If you leave a team, you can join or create another one (before the freeze deadline).' },
    { q: 'What if I have my own project idea?', a: 'You can submit your own project idea through the platform. If the admin approves it, it gets automatically assigned to your team as a reserved project — no other team can take it.' },
    { q: 'Can two teams select the same project?', a: 'No. The system uses database-level locking to ensure that once a team selects a project, no other team can select the same one.' },
    { q: 'What happens after the freeze date?', a: 'After the admin freezes the pool, no changes can be made. Teams are finalized, project assignments are locked, and faculty can see their assigned teams.' },
  ]},
  { category: 'For Faculty', questions: [
    { q: 'How many proposals do I submit?', a: 'Each faculty must submit exactly 4 project proposals per pool. No more, no less. You can save drafts and finalize all 4 at once.' },
    { q: 'Can I edit my proposals after submitting?', a: 'You can only edit proposals while they are in DRAFT status. Once you click "Finalize," all 4 proposals are submitted and cannot be edited.' },
    { q: 'What happens during review?', a: 'The subadmin reviews your 4 proposals: locks (approves) 3 at subadmin level, and places 1 on hold for admin review. The admin then approves or rejects the held proposal.' },
    { q: 'When can I see my assigned team?', a: 'After the pool is frozen, you can see the team assigned to your projects, including student names, enrollment numbers, and email addresses.' },
  ]},
  { category: 'Technical', questions: [
    { q: 'What browsers are supported?', a: 'Chrome, Firefox, Safari, and Edge (latest versions). Internet Explorer is not supported.' },
    { q: 'Is my data secure?', a: 'Yes. Passwords are hashed with bcrypt, authentication uses JWT tokens (with httpOnly refresh cookies), and all actions are recorded in an audit log. The system enforces role-based access control.' },
    { q: 'What happens if I forget my password?', a: 'Contact your admin. They can reset your password from the admin panel and provide you with a new temporary password.' },
  ]},
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const toggle = (key: string) => setOpenIndex(openIndex === key ? null : key);
  const filteredFaqs = faqs.map(cat => ({ ...cat, questions: cat.questions.filter(q => !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())) })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-cream-100 dark:bg-slate-950 transition-colors">
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/3 w-[400px] h-[400px] bg-violet-300/20 dark:bg-purple-600/15 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-purple-300/15 dark:bg-transparent rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet-100 dark:text-purple-400 uppercase tracking-wider mb-4 animate-fade-in-down"><Sparkles className="w-4 h-4" />Support</span>
          <h1 className="text-4xl sm:text-6xl font-bold text-white animate-fade-in-up">Frequently Asked Questions</h1>
          <p className="mt-5 text-lg text-violet-100 dark:text-slate-400 animate-fade-in-up delay-200">Find answers to common questions about the platform</p>
          <div className="mt-8 max-w-xl mx-auto relative animate-fade-in-up delay-400">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-violet-200 dark:text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm outline-none bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur text-white placeholder:text-violet-200 dark:placeholder:text-slate-500 focus:border-white/40 dark:focus:border-purple-500/50 focus:ring-2 focus:ring-white/20 dark:focus:ring-purple-500/20 transition-all" />
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-stone-500 dark:text-slate-500"><p className="text-lg font-medium">No matching questions found</p><p className="text-sm mt-1">Try a different search term</p></div>
        ) : (
          <div className="space-y-10">
            {filteredFaqs.map(category => (
              <div key={category.category}>
                <h2 className="text-xl font-bold text-stone-800 dark:text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/20 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm font-bold">{category.questions.length}</span>
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((faq, i) => {
                    const key = `${category.category}-${i}`;
                    const isOpen = openIndex === key;
                    return (
                      <div key={key} className={`bg-cream-50 dark:bg-white/[0.03] rounded-2xl border overflow-hidden transition-all ${isOpen ? 'border-purple-300 dark:border-purple-500/30 shadow-lg shadow-purple-100/50 dark:shadow-none' : 'border-cream-300 dark:border-white/10 hover:border-cream-300 dark:hover:border-white/20'}`}>
                        <button onClick={() => toggle(key)} className="w-full flex items-center justify-between px-6 py-4.5 text-left">
                          <span className="font-medium text-stone-800 dark:text-white pr-4">{faq.q}</span>
                          {isOpen ? <ChevronUp className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 dark:text-slate-500 flex-shrink-0" />}
                        </button>
                        {isOpen && <div className="px-6 pb-5"><p className="text-sm text-stone-600 dark:text-slate-400 leading-relaxed">{faq.a}</p></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default FAQPage;