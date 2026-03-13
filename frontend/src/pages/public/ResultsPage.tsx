// frontend/src/pages/public/ResultsPage.tsx
import React, { useState, useEffect } from 'react';
import { reportService } from '@/services/reportService';
import { poolService } from '@/services/poolService';
import api from '@/config/api';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/lib/utils';
import { Search, Trophy, Users, Lock } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const [pools, setPools] = useState<any[]>([]);
  const [selectedPool, setSelectedPool] = useState('');
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Try to fetch public pools (frozen/archived)
    const fetchPools = async () => {
      try {
        const { data } = await api.get('/pools?status=FROZEN,ARCHIVED');
        const poolList = data.data || [];
        setPools(poolList);
        if (poolList.length) setSelectedPool(poolList[0].id);
      } catch {
        // If not authenticated, show message
        setError('Sign in to view detailed results');
      }
      setLoading(false);
    };
    fetchPools();
  }, []);

  useEffect(() => {
    if (!selectedPool) return;
    setLoading(true);
    const fetchTeams = async () => {
      try {
        const { data } = await api.get(`/pools/${selectedPool}/reports/teams`);
        setTeams(data.data?.teams || []);
      } catch {
        setTeams([]);
      }
      setLoading(false);
    };
    fetchTeams();
  }, [selectedPool]);

  const filtered = teams.filter(t =>
    !search ||
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.project?.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.members?.some((m: any) => 
      m.student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      m.student.lastName.toLowerCase().includes(search.toLowerCase()) ||
      m.student.enrollmentNo?.toLowerCase().includes(search.toLowerCase())
    )
  );

  if (error) {
    return (
      <div>
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white">Allocation Results</h1>
            <p className="mt-4 text-lg text-green-100">View finalized project allocations</p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-md mx-auto text-center">
            <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-500 mb-6">Please sign in to view allocation results</p>
            <a href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">Sign In</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Trophy className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white">Allocation Results</h1>
          <p className="mt-3 text-green-100">View finalized project team allocations</p>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        {pools.length === 0 && !loading ? (
          <EmptyState title="No finalized pools" subtitle="Results will appear once a pool is frozen" />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <select value={selectedPool} onChange={e => setSelectedPool(e.target.value)}
                className="px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {pools.map((p: any) => <option key={p.id} value={p.id}>{p.name} — {p.academicYear}</option>)}
              </select>
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by team, project, student, enrollment..."
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {loading ? <LoadingSpinner /> : filtered.length === 0 ? (
              <EmptyState title="No teams found" subtitle="Try adjusting your search" />
            ) : (
              <div className="space-y-4">
                {filtered.map((team: any, idx: number) => (
                  <div key={team.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{team.name}</h3>
                            <p className="text-sm text-gray-500">
                              {team.project?.title || 'No project assigned'}
                              {team.project?.faculty && <span className="text-gray-400"> • Guide: {team.project.faculty.firstName} {team.project.faculty.lastName}</span>}
                            </p>
                          </div>
                        </div>
                        <Badge text={team.status || 'FROZEN'} />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2">
                        {team.members?.map((m: any) => (
                          <div key={m.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">
                              {m.student.firstName[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {m.student.firstName} {m.student.lastName}
                                {m.role === 'LEADER' && <span className="ml-1 text-[10px] bg-yellow-100 text-yellow-700 px-1 rounded">Leader</span>}
                              </p>
                              <p className="text-xs text-gray-500 font-mono">{m.student.enrollmentNo}</p>
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