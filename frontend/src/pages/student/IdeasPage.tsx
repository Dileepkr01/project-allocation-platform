// frontend/src/pages/student/IdeasPage.tsx
import React, { useState, useEffect } from 'react';
import { ideaService } from '@/services/ideaService';
import { poolService } from '@/services/poolService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import type { StudentIdea } from '@/types';
import { getErrorMessage } from '@/types';

const IdeasPage: React.FC = () => {
  const [poolId, setPoolId] = useState('');
  const [ideas, setIdeas] = useState<StudentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', domain: '' });

  useEffect(() => {
    poolService.list().then(async r => {
      const pool = r.data?.[0];
      if (pool) { setPoolId(pool.id); const i = await ideaService.getMyIdeas(pool.id); setIdeas(i || []); }
    }).finally(() => setLoading(false));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ideaService.submit(poolId, form);
      toast.success('Idea submitted!');
      setShowForm(false); setForm({ title: '', description: '', domain: '' });
      const i = await ideaService.getMyIdeas(poolId); setIdeas(i || []);
    } catch (e: unknown) { toast.error(getErrorMessage(e)); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Ideas</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"><Plus className="w-4 h-4" />Submit Idea</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold">New Project Idea</h3>
          <p className="text-sm text-gray-500">If approved, this idea will be reserved for your team.</p>
          <div><label className="text-sm font-medium">Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-medium">Description *</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={4} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-medium">Domain</label><input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none" placeholder="AI, Web, IoT..." /></div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">Submit</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white border rounded-lg hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}

      {ideas.length === 0 ? <EmptyState title="No ideas submitted" subtitle="Submit your project idea above" /> :
        ideas.map(idea => (
          <div key={idea.id} className="bg-white rounded-xl border p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1"><Lightbulb className="w-4 h-4 text-yellow-500" /><Badge text={idea.status} /></div>
                <h3 className="font-semibold text-gray-900">{idea.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{idea.description}</p>
              </div>
            </div>
            {idea.adminFeedback && <div className="mt-3 bg-blue-50 rounded-lg p-3 text-sm"><strong>Admin:</strong> {idea.adminFeedback}</div>}
          </div>
        ))}
    </div>
  );
};

export default IdeasPage;