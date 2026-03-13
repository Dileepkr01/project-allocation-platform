// frontend/src/pages/public/AboutPage.tsx
import React from 'react';
import { GraduationCap, Target, Eye, Users, Code, Layers, Database, Palette } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">About ProjectAlloc</h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            An automated project allocation platform designed to eliminate manual processes,
            reduce bias, and ensure every student gets a fair chance at selecting their preferred project.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To automate and streamline the project allocation process in educational institutions,
              eliminating manual overhead, preventing conflicts, and ensuring complete transparency
              from proposal submission to final team formation.
            </p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-8">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-7 h-7 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A future where every university has access to a fair, transparent, and efficient
              project allocation system — where faculty can focus on mentoring and students can
              focus on building, not navigating bureaucracy.
            </p>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Problems We Solve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { problem: 'Manual Allocation', solution: 'Fully automated pool-based system with defined phases' },
              { problem: 'Duplicate Selection', solution: 'Database-level locking prevents same project being selected twice' },
              { problem: 'Lack of Transparency', solution: 'Complete audit trail of every action taken by every user' },
              { problem: 'Unfair Distribution', solution: 'Students browse projects without seeing faculty names — pure merit' },
              { problem: 'Missed Deadlines', solution: 'Timeline enforcement blocks actions outside their designated phase' },
              { problem: 'Communication Gaps', solution: 'In-app + email notifications for every critical event' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border p-6">
                <div className="text-red-500 font-semibold text-sm mb-2">❌ {item.problem}</div>
                <div className="text-green-600 text-sm">✅ {item.solution}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Built With Modern Technology</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Code className="w-6 h-6" />, label: 'Frontend', techs: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'], color: 'bg-blue-100 text-blue-600' },
              { icon: <Layers className="w-6 h-6" />, label: 'Backend', techs: ['Node.js', 'Express', 'TypeScript', 'Prisma ORM'], color: 'bg-green-100 text-green-600' },
              { icon: <Database className="w-6 h-6" />, label: 'Database', techs: ['PostgreSQL', 'Prisma Migrations', 'UUID Primary Keys'], color: 'bg-purple-100 text-purple-600' },
              { icon: <Palette className="w-6 h-6" />, label: 'Features', techs: ['JWT Auth', 'Role-Based Access', 'Email (Nodemailer)', 'Audit Logging'], color: 'bg-orange-100 text-orange-600' },
            ].map(stack => (
              <div key={stack.label} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className={`w-12 h-12 ${stack.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>{stack.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-3">{stack.label}</h3>
                <ul className="space-y-1">
                  {stack.techs.map(t => <li key={t} className="text-sm text-gray-500">{t}</li>)}
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