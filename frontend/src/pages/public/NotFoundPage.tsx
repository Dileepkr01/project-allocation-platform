// frontend/src/pages/public/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-cream-100 dark:bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden transition-colors">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-200/30 dark:bg-red-600/10 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="text-center max-w-lg relative z-10">
        <div className="text-[120px] font-bold bg-gradient-to-b from-blue-600 dark:from-white to-blue-300 dark:to-slate-600 bg-clip-text text-transparent leading-none mb-6">404</div>
        <h1 className="text-3xl font-bold text-stone-800 dark:text-white mb-3">Page Not Found</h1>
        <p className="text-stone-500 dark:text-slate-400 mb-10">Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-violet-700 transition-all shadow-lg shadow-blue-500/20">
            <Home className="w-4 h-4" />Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cream-50 dark:bg-white/5 border border-cream-300 dark:border-white/10 text-stone-600 dark:text-white rounded-2xl font-semibold hover:bg-cream-100 dark:hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4" />Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;