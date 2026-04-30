// frontend/src/pages/subadmin/ReviewPage.tsx
import React, { useState, useEffect } from 'react';
import { poolService } from '@/services/poolService';
import { projectService } from '@/services/projectService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Lock, AlertTriangle, CheckCircle2, Send, ClipboardList,
  ChevronRight, UserCheck, FileSearch, ArrowRight
} from 'lucide-react';
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

  const lockedCount = Object.values(decisions).filter(v => v === 'LOCK').length;
  const heldCount = Object.values(decisions).filter(v => v === 'HOLD').length;
  const submittedFaculty = facultyList.filter(f => f.hasSubmitted).length;
  const totalFaculty = facultyList.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-900 dark:text-white">Review Console</h1>
          <p className="text-sm text-amber-700/60 dark:text-slate-400 mt-0.5">Evaluate and manage faculty proposals</p>
        </div>
        <select
          value={selectedPool}
          onChange={e => { setSelectedPool(e.target.value); setSelectedFaculty(''); }}
          className="px-4 py-2.5 border-2 border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-slate-800 rounded-xl text-sm font-medium text-amber-900 dark:text-amber-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-500/20"
        >
          {pools.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 stagger-children">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-amber-500/5 border-2 border-amber-200/50 dark:border-amber-500/20 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 mx-auto bg-amber-500/10 rounded-xl flex items-center justify-center mb-3">
            <ClipboardList className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-900 dark:text-white">{totalFaculty}</p>
          <p className="text-xs text-amber-600 mt-1 font-medium">Total Faculty</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-emerald-500/10 dark:to-emerald-500/5 border-2 border-green-200/50 dark:border-emerald-500/20 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 mx-auto bg-green-500/10 rounded-xl flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900 dark:text-white">{submittedFaculty}</p>
          <p className="text-xs text-green-600 mt-1 font-medium">Submitted</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-slate-800 border-2 border-slate-200/50 dark:border-slate-700 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 mx-auto bg-slate-500/10 rounded-xl flex items-center justify-center mb-3">
            <FileSearch className="w-5 h-5 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-stone-800 dark:text-white">{totalFaculty - submittedFaculty}</p>
          <p className="text-xs text-slate-600 mt-1 font-medium">Pending</p>
        </div>
      </div>

      {/* Faculty List */}
      <div className="bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-amber-100 dark:border-amber-500/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-amber-100 dark:border-amber-500/20 bg-gradient-to-r from-amber-50 dark:from-amber-500/10 to-transparent">
          <h2 className="font-semibold text-amber-900 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-amber-500" />
            Faculty Submissions
          </h2>
        </div>
        <div className="divide-y divide-amber-100/50">
          {facultyList.map((f: FacultyStatus) => (
            <div
              key={f.facultyId}
              onClick={() => f.hasSubmitted && setSelectedFaculty(f.facultyId)}
              className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-200 ${
                selectedFaculty === f.facultyId
                  ? 'bg-amber-500/5 border-l-4 border-l-amber-500'
                  : f.hasSubmitted
                    ? 'hover:bg-amber-50/50 border-l-4 border-l-transparent'
                    : 'opacity-40 cursor-not-allowed border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                  selectedFaculty === f.facultyId
                    ? 'bg-amber-500 text-white'
                    : f.hasSubmitted
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-400'
                }`}>
                  {f.faculty.firstName[0]}{f.faculty.lastName[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{f.faculty.firstName} {f.faculty.lastName}</p>
                  <p className="text-xs text-slate-500">{f.faculty.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${
                  f.hasSubmitted
                    ? 'bg-green-500/10 text-green-700 border border-green-200'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}>
                  {f.hasSubmitted ? '✓ Submitted' : 'Awaiting'}
                </span>
                {f.hasSubmitted && <ChevronRight className="w-4 h-4 text-amber-400" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          {/* Review Progress */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">Review Progress</p>
                <p className="text-amber-100 text-sm mt-1">Lock 3 proposals, Hold 1 for admin review</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{lockedCount}<span className="text-lg text-amber-200">/3</span></p>
                  <p className="text-xs text-amber-200 font-medium">Locked</p>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold">{heldCount}<span className="text-lg text-amber-200">/1</span></p>
                  <p className="text-xs text-amber-200 font-medium">On Hold</p>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${((lockedCount + heldCount) / 4) * 100}%` }}
              />
            </div>
          </div>

          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`bg-cream-50 rounded-2xl border-2 p-6 transition-all duration-300 ${
                decisions[p.id] === 'LOCK'
                  ? 'border-green-400 shadow-lg shadow-green-100'
                  : decisions[p.id] === 'HOLD'
                    ? 'border-amber-400 shadow-lg shadow-amber-100'
                    : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    decisions[p.id] === 'LOCK'
                      ? 'bg-green-500 text-white'
                      : decisions[p.id] === 'HOLD'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.description}</p>
                    {p.domain && (
                      <span className="inline-block mt-3 text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-lg font-medium">
                        {p.domain}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5 ml-14">
                <button
                  onClick={() => setDecision(p.id, 'LOCK')}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl font-semibold transition-all duration-200 ${
                    decisions[p.id] === 'LOCK'
                      ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  {decisions[p.id] === 'LOCK' ? '✓ Locked' : 'Lock'}
                </button>
                <button
                  onClick={() => setDecision(p.id, 'HOLD')}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl font-semibold transition-all duration-200 ${
                    decisions[p.id] === 'HOLD'
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  {decisions[p.id] === 'HOLD' ? '⏸ Held' : 'Hold'}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={submitReview}
            disabled={Object.keys(decisions).length !== 4}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-base hover:from-amber-600 hover:to-orange-600 disabled:from-slate-200 disabled:to-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-200/50 disabled:shadow-none transition-all duration-300"
          >
            <Send className="w-5 h-5" />Submit Review
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;