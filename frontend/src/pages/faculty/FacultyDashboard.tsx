// frontend/src/pages/faculty/FacultyDashboard.tsx
import React, { useState, useEffect } from 'react';
import { poolService } from '@/services/poolService';
import { projectService } from '@/services/projectService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Plus, Send, Trash2, Edit3, BookOpen, FilePlus,
  CheckCircle, Clock, XCircle, AlertCircle, Users2
} from 'lucide-react';
import toast from 'react-hot-toast';
import type { Pool, Project, TeamMember } from '@/types';
import { getErrorMessage } from '@/types';

const FacultyDashboard: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', domain: '', prerequisites: '', expectedOutcome: '', maxTeamSize: 3 });

  useEffect(() => { poolService.list().then(r => { setPools(r.data || []); if (r.data?.length) setSelectedPool(r.data[0].id); }).finally(() => setLoading(false)); }, []);
  useEffect(() => { if (selectedPool) loadProjects(); }, [selectedPool]);

  const loadProjects = async () => {
    if (!selectedPool) return;
    try { const p = await projectService.listByPool(selectedPool); setProjects(p); } catch {}
  };

  const submitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) { await projectService.edit(selectedPool, editingId, form); toast.success('Updated'); }
      else { await projectService.submit(selectedPool, form); toast.success('Proposal saved'); }
      setShowForm(false); setEditingId(null); setForm({ title: '', description: '', domain: '', prerequisites: '', expectedOutcome: '', maxTeamSize: 3 }); loadProjects();
    } catch (e: unknown) { toast.error(getErrorMessage(e)); }
  };

  const finalize = async () => {
    try { await projectService.finalize(selectedPool); toast.success('All proposals submitted!'); loadProjects(); }
    catch (e: unknown) { toast.error(getErrorMessage(e)); }
  };

  const deleteProposal = async (id: string) => {
    try { await projectService.remove(selectedPool, id); toast.success('Deleted'); loadProjects(); }
    catch (e: unknown) { toast.error(getErrorMessage(e)); }
  };

  const startEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, domain: p.domain || '', prerequisites: p.prerequisites || '', expectedOutcome: p.expectedOutcome || '', maxTeamSize: p.maxTeamSize });
    setEditingId(p.id); setShowForm(true);
  };

  if (loading) return <LoadingSpinner />;

  const pool = pools.find(p => p.id === selectedPool);
  const draftCount = projects.filter(p => p.status === 'DRAFT').length;
  const canSubmit = pool?.status === 'SUBMISSION_OPEN';

  const statusIcon = (s: string) => {
    switch (s) {
      case 'DRAFT': return <Clock className="w-4 h-4 text-slate-400" />;
      case 'SUBMITTED': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'LOCKED': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'APPROVED': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'REJECTED': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'ON_HOLD': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const statusStyle = (s: string) => {
    switch (s) {
      case 'DRAFT': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'SUBMITTED': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'LOCKED': return 'bg-green-50 text-green-700 border-green-200';
      case 'APPROVED': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED': return 'bg-red-50 text-red-700 border-red-200';
      case 'ON_HOLD': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-violet-900 dark:text-white">My Proposals</h1>
          <p className="text-sm text-violet-600/60 dark:text-slate-400 mt-0.5">Create and manage your project proposals</p>
        </div>
        {pools.length > 1 && (
          <select
            value={selectedPool}
            onChange={e => setSelectedPool(e.target.value)}
            className="px-4 py-2.5 border-2 border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-slate-800 rounded-xl text-sm font-medium text-violet-900 dark:text-violet-300 focus:outline-none focus:border-violet-400"
          >
            {pools.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
      </div>

      {/* Pool Info Banner */}
      {pool && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 text-white animate-fade-in-up">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl translate-x-10 -translate-y-10" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">{pool.name}</p>
                <p className="text-purple-200 text-sm">Status: {pool.status.replace('_', ' ')} • {projects.length}/4 proposals</p>
              </div>
            </div>
            <div className="flex gap-3">
              {canSubmit && projects.length < 4 && (
                <button
                  onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', description: '', domain: '', prerequisites: '', expectedOutcome: '', maxTeamSize: 3 }); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-violet-700 rounded-xl font-semibold hover:bg-cream-200 transition-colors shadow-lg"
                >
                  <Plus className="w-4 h-4" />New Proposal
                </button>
              )}
              {canSubmit && draftCount === 4 && (
                <button onClick={finalize} className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg">
                  <Send className="w-4 h-4" />Finalize All
                </button>
              )}
            </div>
          </div>
          {/* Progress */}
          <div className="relative z-10 mt-5">
            <div className="flex justify-between text-xs text-purple-200 mb-2">
              <span>Proposals Progress</span>
              <span>{projects.length}/4</span>
            </div>
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(projects.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-violet-200 dark:border-violet-500/30 p-6 space-y-5 shadow-lg shadow-violet-100/50 dark:shadow-none animate-scale-in">
          <div className="flex items-center gap-3 pb-4 border-b border-violet-100">
            <div className="p-2 bg-violet-100 rounded-lg">
              <FilePlus className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="font-bold text-violet-900">{editingId ? 'Edit' : 'New'} Proposal</h3>
          </div>
          <form onSubmit={submitProposal} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-violet-900">Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                className="w-full mt-1.5 px-4 py-2.5 border-2 border-violet-200 rounded-xl text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all" placeholder="Enter proposal title" />
            </div>
            <div>
              <label className="text-sm font-semibold text-violet-900">Description *</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={4}
                className="w-full mt-1.5 px-4 py-2.5 border-2 border-violet-200 rounded-xl text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all resize-none" placeholder="Describe your project proposal in detail" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-semibold text-violet-900">Domain</label>
                <input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-2.5 border-2 border-violet-200 rounded-xl text-sm outline-none focus:border-violet-500" placeholder="AI, Web, IoT" />
              </div>
              <div>
                <label className="text-sm font-semibold text-violet-900">Prerequisites</label>
                <input value={form.prerequisites} onChange={e => setForm(f => ({ ...f, prerequisites: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-2.5 border-2 border-violet-200 rounded-xl text-sm outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="text-sm font-semibold text-violet-900">Max Team Size</label>
                <select value={form.maxTeamSize} onChange={e => setForm(f => ({ ...f, maxTeamSize: Number(e.target.value) }))}
                  className="w-full mt-1.5 px-4 py-2.5 border-2 border-violet-200 rounded-xl text-sm outline-none focus:border-violet-500">
                  <option value={3}>3</option><option value={4}>4</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-200/50 transition-all">
                Save Proposal
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-6 py-2.5 bg-white border-2 border-violet-200 rounded-xl font-semibold text-violet-700 hover:bg-cream-200 transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Proposal Cards */}
      <div className="space-y-4">
        {projects.length === 0 ? <EmptyState title="No proposals yet" subtitle={canSubmit ? 'Click "New Proposal" to get started' : 'Submissions are not open'} /> :
          projects.map((p, i) => (
            <div key={p.id} className="bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-violet-100 dark:border-violet-500/20 hover:border-violet-200 dark:hover:border-violet-400/40 p-6 transition-all duration-200 hover:shadow-lg hover:shadow-violet-50 dark:hover:shadow-none">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 dark:text-white text-lg">{p.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{p.description.substring(0, 200)}{p.description.length > 200 ? '...' : ''}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {p.domain && <span className="text-xs bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-lg font-medium">{p.domain}</span>}
                      {p.prerequisites && <span className="text-xs bg-cream-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg font-medium">{p.prerequisites}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusStyle(p.status)}`}>
                    {statusIcon(p.status)}
                    {p.status.replace('_', ' ')}
                  </span>
                  {p.status === 'DRAFT' && canSubmit && (
                    <div className="flex gap-1 ml-2">
                      <button onClick={() => startEdit(p)} className="p-2 hover:bg-cream-200 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4 text-violet-500" />
                      </button>
                      <button onClick={() => deleteProposal(p.id)} className="p-2 hover:bg-red-50/50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {p.team && p.team.members && (
                <div className="mt-5 bg-gradient-to-r from-emerald-50 dark:from-emerald-500/10 to-green-50 dark:to-transparent rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Users2 className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Assigned Team: {p.team.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {p.team.members.map((m: TeamMember) => (
                      <div key={m.id} className="flex items-center gap-2 bg-white/70 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                        <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">
                          {m.student.firstName[0]}{m.student.lastName[0]}
                        </div>
                        <div>
                          <span className="font-medium text-stone-800 dark:text-white">{m.student.firstName} {m.student.lastName}</span>
                          {m.role === 'LEADER' && <span className="ml-1.5 text-xs text-amber-600">👑</span>}
                          <p className="text-xs text-slate-500">{m.student.enrollmentNo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FacultyDashboard;