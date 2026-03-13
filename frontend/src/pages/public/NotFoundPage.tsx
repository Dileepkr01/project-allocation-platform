// frontend/src/pages/public/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <Home className="w-4 h-4" />Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;