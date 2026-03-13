// frontend/src/pages/public/FAQPage.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'What is ProjectAlloc?', a: 'ProjectAlloc is an automated project allocation platform designed for universities. It manages the entire lifecycle from faculty proposal submission to student team formation and project selection.' },
      { q: 'Who can use this platform?', a: 'The platform supports four roles: Admin (manages everything), Subadmin (reviews proposals), Faculty (submits project proposals), and Students (form teams and select projects).' },
      { q: 'How do I get an account?', a: 'Accounts are created by the Admin only. There is no self-registration. The Admin either creates accounts manually or imports them via CSV. You\'ll receive your credentials from your department.' },
    ],
  },
  {
    category: 'For Students',
    questions: [
      { q: 'Can I see which faculty proposed a project?', a: 'No. To ensure fairness, students only see project titles, descriptions, domains, and prerequisites — not the faculty name. Faculty names are revealed only after teams are frozen.' },
      { q: 'How do I form a team?', a: 'One student creates a team and becomes the leader. The leader then invites other students. Each team needs a minimum of 3 members (configurable by admin). Maximum is usually 3, but some projects allow 4.' },
      { q: 'Can I be in multiple teams?', a: 'No. You can only be an active member of one team per pool. If you leave a team, you can join or create another one (before the freeze deadline).' },
      { q: 'What if I have my own project idea?', a: 'You can submit your own project idea through the platform. If the admin approves it, it gets automatically assigned to your team as a reserved project — no other team can take it.' },
      { q: 'Can two teams select the same project?', a: 'No. The system uses database-level locking to ensure that once a team selects a project, no other team can select the same one.' },
      { q: 'What happens after the freeze date?', a: 'After the admin freezes the pool, no changes can be made. Teams are finalized, project assignments are locked, and faculty can see their assigned teams.' },
    ],
  },
  {
    category: 'For Faculty',
    questions: [
      { q: 'How many proposals do I submit?', a: 'Each faculty must submit exactly 4 project proposals per pool. No more, no less. You can save drafts and finalize all 4 at once.' },
      { q: 'Can I edit my proposals after submitting?', a: 'You can only edit proposals while they are in DRAFT status. Once you click "Finalize," all 4 proposals are submitted and cannot be edited.' },
      { q: 'What happens during review?', a: 'The subadmin reviews your 4 proposals: locks (approves) 3 at subadmin level, and places 1 on hold for admin review. The admin then approves or rejects the held proposal.' },
      { q: 'When can I see my assigned team?', a: 'After the pool is frozen, you can see the team assigned to your projects, including student names, enrollment numbers, and email addresses.' },
    ],
  },
  {
    category: 'Technical',
    questions: [
      { q: 'What browsers are supported?', a: 'Chrome, Firefox, Safari, and Edge (latest versions). Internet Explorer is not supported.' },
      { q: 'Is my data secure?', a: 'Yes. Passwords are hashed with bcrypt, authentication uses JWT tokens (with httpOnly refresh cookies), and all actions are recorded in an audit log. The system enforces role-based access control.' },
      { q: 'What happens if I forget my password?', a: 'Contact your admin. They can reset your password from the admin panel and provide you with a new temporary password.' },
    ],
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const toggle = (key: string) => setOpenIndex(openIndex === key ? null : key);

  const filteredFaqs = faqs.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => !search || q.q.toLowerCase().includes(search.toLowerCase()) || q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <HelpCircle className="w-12 h-12 text-purple-200 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-purple-100">Find answers to common questions about the platform</p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur text-white placeholder:text-purple-200 border border-white/20"
            />
          </div>
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No matching questions found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredFaqs.map(category => (
              <div key={category.category}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">
                    {category.questions.length}
                  </span>
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((faq, i) => {
                    const key = `${category.category}-${i}`;
                    const isOpen = openIndex === key;
                    return (
                      <div key={key} className="bg-white rounded-xl border overflow-hidden">
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
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