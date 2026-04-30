// frontend/src/pages/public/ResultsPage.tsx
import React, { useState, useEffect } from 'react';
import api from '@/config/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/lib/utils';
import { Search, Trophy, Lock, Sparkles } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [selectedPool, setSelectedPool] = useState('');
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const { data } = await api.get('/pools?status=FROZEN,ARCHIVED');
        const poolList = data.data || [];
        setPools(poolList);
        if (poolList.length) setSelectedPool(poolList[0].id);
      } catch { setError('Sign in to view detailed results'); }
      setLoading(false);
    };
    fetchPools();
  }, []);

  useEffect(() => {
    if (!selectedPool) return;
    setLoading(true);
    const fetchTeams = async () => {
      try { const { data } = await api.get(`/pools/${selectedPool}/reports/teams`); setTeams(data.data?.teams || []); }
      catch { setTeams([]); }
      setLoading(false);
    };
    fetchTeams();
  }, [selectedPool]);

  const filtered = teams.filter(t =>
    !search || t.name?.toLowerCase().includes(search.toLowerCase()) || t.project?.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.members?.some((m: any) => m.student.firstName.toLowerCase().includes(search.toLowerCase()) || m.student.lastName.toLowerCase().includes(search.toLowerCase()) || m.student.enrollmentNo?.toLowerCase().includes(search.toLowerCase()))
  );

  if (error) {
    return (
      <div className="bg-cream-100 dark:bg-slate-950 min-h-[80vh] transition-colors">
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-emerald-500 dark:from-slate-950 dark:to-slate-950">
          <div className="absolute inset-0"><div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-yellow-300/20 dark:bg-emerald-600/15 rounded-full blur-[120px]" /><div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] bg-amber-300/15 dark:bg-transparent rounded-full blur-[100px]" /></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 dark:text-emerald-400 uppercase tracking-wider mb-4"><Sparkles className="w-4 h-4" />Results</span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white">Allocation Results</h1>
            <p className="mt-5 text-lg text-yellow-100 dark:text-slate-400">View finalized project allocations</p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-cream-200 dark:bg-white/5 border border-cream-300 dark:border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5"><Lock className="w-8 h-8 text-stone-400 dark:text-slate-500" /></div>
            <h2 className="text-xl font-semibold text-stone-800 dark:text-white mb-2">Authentication Required</h2>
            <p className="text-stone-500 dark:text-slate-400 mb-6">Please sign in to view allocation results</p>
            <a href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-violet-700 shadow-lg shadow-blue-500/20 transition-all">Sign In</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-cream-100 dark:bg-slate-950 min-h-[80vh] transition-colors">
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-amber-500 via-yellow-500 to-emerald-500 dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0"><div className="absolute top-20 right-1/3 w-[400px] h-[400px] bg-yellow-300/20 dark:bg-emerald-600/15 rounded-full blur-[120px]" /><div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-amber-300/15 dark:bg-transparent rounded-full blur-[100px]" /></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-100 dark:text-emerald-400 uppercase tracking-wider mb-4"><Trophy className="w-4 h-4" />Results</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Allocation Results</h1>
          <p className="mt-4 text-yellow-100 dark:text-slate-400">View finalized project team allocations</p>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        {pools.length === 0 && !loading ? <EmptyState title="No finalized pools" subtitle="Results will appear once a pool is frozen" /> : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <select value={selectedPool} onChange={e => setSelectedPool(e.target.value)}
                className="px-4 py-3 bg-cream-50 dark:bg-white/5 border border-cream-300 dark:border-white/10 rounded-xl text-stone-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-500/30">
                {pools.map((p: any) => <option key={p.id} value={p.id} className="dark:bg-slate-900">{p.name} — {p.academicYear}</option>)}
              </select>
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by team, project, student, enrollment..."
                  className="w-full pl-11 pr-4 py-3 bg-cream-50 dark:bg-white/5 border border-cream-300 dark:border-white/10 rounded-xl text-stone-800 dark:text-white text-sm placeholder:text-stone-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all" />
              </div>
            </div>
            {loading ? <LoadingSpinner /> : filtered.length === 0 ? <EmptyState title="No teams found" subtitle="Try adjusting your search" /> : (
              <div className="space-y-4">
                {filtered.map((team: any, idx: number) => (
                  <div key={team.id} className="bg-cream-50 dark:bg-white/[0.03] rounded-2xl border border-cream-300 dark:border-white/10 overflow-hidden hover:border-cream-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-none transition-all">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">{idx + 1}</div>
                          <div>
                            <h3 className="font-semibold text-stone-800 dark:text-white">{team.name}</h3>
                            <p className="text-sm text-stone-500 dark:text-slate-400">{team.project?.title || 'No project assigned'}{team.project?.faculty && <span className="text-stone-400 dark:text-slate-500"> • Guide: {team.project.faculty.firstName} {team.project.faculty.lastName}</span>}</p>
                          </div>
                        </div>
                        <Badge text={team.status || 'FROZEN'} />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {team.members?.map((m: any) => (
                          <div key={m.id} className="flex items-center gap-3 p-3 bg-cream-200 dark:bg-white/[0.03] border border-cream-200 dark:border-white/5 rounded-xl">
                            <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/15 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-bold">{m.student.firstName[0]}</div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-stone-800 dark:text-white truncate">{m.student.firstName} {m.student.lastName}{m.role === 'LEADER' && <span className="ml-1.5 text-[10px] bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold">Leader</span>}</p>
                              <p className="text-xs text-stone-500 dark:text-slate-500 font-mono">{m.student.enrollmentNo}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ResultsPage;