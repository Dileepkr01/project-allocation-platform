// frontend/src/pages/faculty/FacultyDashboard.tsx
import React, { useState, useEffect } from 'react';
import { poolService } from '@/services/poolService';
import { projectService } from '@/services/projectService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, Send, Trash2, Edit3 } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Proposals</h1>
        {pools.length > 1 && (
          <select value={selectedPool} onChange={e => setSelectedPool(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
            {pools.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        )}
      </div>

      {pool && <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
        <div><p className="font-medium text-blue-800">{pool.name}</p><p className="text-sm text-blue-600">Status: {pool.status} • {projects.length}/4 proposals</p></div>
        {canSubmit && projects.length < 4 && <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', description: '', domain: '', prerequisites: '', expectedOutcome: '', maxTeamSize: 3 }); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><Plus className="w-4 h-4" />Add Proposal</button>}
        {canSubmit && draftCount === 4 && <button onClick={finalize} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><Send className="w-4 h-4" />Finalize All</button>}
      </div>}

      {showForm && (
        <form onSubmit={submitProposal} className="bg-white rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold">{editingId ? 'Edit' : 'New'} Proposal</h3>
          <div><label className="text-sm font-medium">Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div><label className="text-sm font-medium">Description *</label><textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required rows={4} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-medium">Domain</label><input value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none" placeholder="AI, Web, IoT" /></div>
            <div><label className="text-sm font-medium">Prerequisites</label><input value={form.prerequisites} onChange={e => setForm(f => ({ ...f, prerequisites: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none" /></div>
            <div><label className="text-sm font-medium">Max Team Size</label><select value={form.maxTeamSize} onChange={e => setForm(f => ({ ...f, maxTeamSize: Number(e.target.value) }))} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none"><option value={3}>3</option><option value={4}>4</option></select></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-6 py-2 bg-white border rounded-lg hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {projects.length === 0 ? <EmptyState title="No proposals" subtitle={canSubmit ? 'Add your first proposal' : 'Submissions not open'} /> :
          projects.map((p, i) => (
            <div key={p.id} className="bg-white rounded-xl border p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Proposal {i + 1}</p>
                  <h4 className="font-semibold text-gray-900 mt-1">{p.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">{p.description.substring(0, 200)}{p.description.length > 200 ? '...' : ''}</p>
                  {p.domain && <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-0.5 rounded">{p.domain}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge text={p.status} />
                  {p.status === 'DRAFT' && canSubmit && <>
                    <button onClick={() => startEdit(p)} className="p-1.5 hover:bg-gray-100 rounded"><Edit3 className="w-4 h-4 text-gray-500" /></button>
                    <button onClick={() => deleteProposal(p.id)} className="p-1.5 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button>
                  </>}
                </div>
              </div>
              {p.team && p.team.members && (
                <div className="mt-4 bg-green-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">Assigned Team: {p.team.name}</p>
                  <div className="mt-2 space-y-1">
                    {p.team.members.map((m: TeamMember) => (
                      <p key={m.id} className="text-sm text-green-700">{m.student.firstName} {m.student.lastName} ({m.student.enrollmentNo}) {m.role === 'LEADER' ? '👑' : ''} — {m.student.email}</p>
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