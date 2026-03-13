// frontend/src/pages/student/BrowseProjectsPage.tsx
import React, { useState, useEffect } from 'react';
import { projectService } from '@/services/projectService';
import { teamService } from '@/services/teamService';
import { poolService } from '@/services/poolService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, CheckCircle2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import toast from 'react-hot-toast';
import type { Project, Team } from '@/types';
import { getErrorMessage } from '@/types';

const BrowseProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [poolId, setPoolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectId, setSelectId] = useState<string | null>(null);

  useEffect(() => {
    poolService.list().then(async r => {
      const pool = r.data?.[0];
      if (pool) {
        setPoolId(pool.id);
        const [p, t] = await Promise.all([projectService.listByPool(pool.id), teamService.getMyTeam(pool.id)]);
        setProjects(p); setMyTeam(t);
      }
    }).finally(() => setLoading(false));
  }, []);

  const selectProject = async () => {
    if (!selectId || !myTeam) return;
    try {
      await teamService.selectProject(poolId, myTeam.id, selectId);
      toast.success('Project selected!');
      const [p, t] = await Promise.all([projectService.listByPool(poolId), teamService.getMyTeam(poolId)]);
      setProjects(p); setMyTeam(t);
    } catch (e: unknown) { toast.error(getErrorMessage(e)); }
    setSelectId(null);
  };

  if (loading) return <LoadingSpinner />;

  const filtered = projects.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.domain?.toLowerCase().includes(search.toLowerCase()));
  const canSelect = myTeam && !myTeam.projectId && myTeam.leaderId;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Approved Projects</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {myTeam?.projectId && <div className="bg-green-50 border border-green-200 rounded-xl p-4"><CheckCircle2 className="w-5 h-5 text-green-500 inline mr-2" />Your team has selected a project: <strong>{myTeam.project?.title}</strong></div>}

      {filtered.length === 0 ? <EmptyState title="No projects available" /> : (
        <div className="grid gap-4">
          {filtered.map(p => {
            const taken = !!p.team;
            return (
              <div key={p.id} className={`bg-white rounded-xl border p-5 ${taken ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{p.description}</p>
                    <div className="flex gap-2 mt-3">
                      {p.domain && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{p.domain}</span>}
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Team size: {p.maxTeamSize}</span>
                      {p.prerequisites && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">{p.prerequisites}</span>}
                    </div>
                  </div>
                  <div className="ml-4">
                    {taken ? <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">Taken</span> :
                      canSelect && !myTeam?.projectId ? <button onClick={() => setSelectId(p.id)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Select</button> :
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Available</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectId && <ConfirmDialog open title="Select Project?" message="This project will be assigned to your team." variant="info" confirmText="Select" onConfirm={selectProject} onCancel={() => setSelectId(null)} />}
    </div>
  );
};

export default BrowseProjectsPage;