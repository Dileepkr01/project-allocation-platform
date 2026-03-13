// frontend/src/pages/subadmin/ReviewPage.tsx
import React, { useState, useEffect } from 'react';
import { poolService } from '@/services/poolService';
import { projectService } from '@/services/projectService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Lock, AlertTriangle, CheckCircle2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Pool, Project, FacultyStatus, ReviewDecision } from '@/types';
import { getErrorMessage } from '@/types';

const ReviewPage: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState('');
  const [facultyList, setFacultyList] = useState<FacultyStatus[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [decisions, setDecisions] = useState<Record<string, 'LOCK' | 'HOLD'>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { poolService.list().then(r => { setPools(r.data || []); if (r.data?.length) setSelectedPool(r.data[0].id); }).finally(() => setLoading(false)); }, []);

  useEffect(() => {
    if (!selectedPool) return;
    projectService.getFacultyStatus(selectedPool).then(r => setFacultyList(r || []));
  }, [selectedPool]);

  useEffect(() => {
    if (!selectedPool || !selectedFaculty) return;
    projectService.listByPool(selectedPool).then(all => {
      const fProjects = all.filter((p: Project) => p.facultyId === selectedFaculty && p.status === 'SUBMITTED');
      setProjects(fProjects); setDecisions({});
    });
  }, [selectedFaculty, selectedPool]);

  const setDecision = (projectId: string, action: 'LOCK' | 'HOLD') => {
    setDecisions(prev => {
      const next = { ...prev, [projectId]: action };
      const holds = Object.values(next).filter(v => v === 'HOLD').length;
      if (holds > 1 && action === 'HOLD') {
        toast.error('Only 1 can be held'); return prev;
      }
      return next;
    });
  };

  const submitReview = async () => {
    const locks = Object.values(decisions).filter(v => v === 'LOCK').length;
    const holds = Object.values(decisions).filter(v => v === 'HOLD').length;
    if (locks !== 3 || holds !== 1) { toast.error('Must lock 3 and hold 1'); return; }

    const dec: ReviewDecision[] = Object.entries(decisions).map(([projectId, action]) => ({ projectId, action }));
    try {
      await projectService.reviewBatch(selectedPool, selectedFaculty, dec);
      toast.success('Review submitted!');
      setSelectedFaculty(''); setDecisions({});
    } catch (e: unknown) { toast.error(getErrorMessage(e)); }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Review Proposals</h1>

      <div className="flex gap-4">
        <select value={selectedPool} onChange={e => { setSelectedPool(e.target.value); setSelectedFaculty(''); }} className="px-3 py-2 border rounded-lg text-sm">
          {pools.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Faculty List */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Faculty Submissions</h2>
        <div className="space-y-2">
          {facultyList.map((f: FacultyStatus) => (
            <div key={f.facultyId} onClick={() => f.hasSubmitted && setSelectedFaculty(f.facultyId)}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${selectedFaculty === f.facultyId ? 'border-blue-500 bg-blue-50' : f.hasSubmitted ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}>
              <div>
                <p className="font-medium">{f.faculty.firstName} {f.faculty.lastName}</p>
                <p className="text-sm text-gray-500">{f.faculty.email}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${f.hasSubmitted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {f.hasSubmitted ? 'Submitted' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="font-medium text-yellow-800">Review: Lock 3 proposals, Hold 1 for admin review</p>
            <p className="text-sm text-yellow-600 mt-1">Locked: {Object.values(decisions).filter(v => v === 'LOCK').length}/3 • On Hold: {Object.values(decisions).filter(v => v === 'HOLD').length}/1</p>
          </div>

          {projects.map(p => (
            <div key={p.id} className={`bg-white rounded-xl border p-5 ${decisions[p.id] === 'LOCK' ? 'ring-2 ring-green-500' : decisions[p.id] === 'HOLD' ? 'ring-2 ring-yellow-500' : ''}`}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.description}</p>
              <div className="flex gap-2 mt-3">
                {p.domain && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{p.domain}</span>}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setDecision(p.id, 'LOCK')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border ${decisions[p.id] === 'LOCK' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-green-50'}`}>
                  <Lock className="w-4 h-4" />Lock (Approve)
                </button>
                <button onClick={() => setDecision(p.id, 'HOLD')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border ${decisions[p.id] === 'HOLD' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-700 hover:bg-yellow-50'}`}>
                  <AlertTriangle className="w-4 h-4" />Hold (Escalate)
                </button>
              </div>
            </div>
          ))}

          <button onClick={submitReview} disabled={Object.keys(decisions).length !== 4}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;