// frontend/src/pages/student/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { poolService } from '@/services/poolService';
import { teamService } from '@/services/teamService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { GraduationCap, Users, Lightbulb, Mail } from 'lucide-react';
import type { Pool, Team } from '@/types';

const StudentDashboard: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [inviteCount, setInviteCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    poolService.list().then(async r => {
      const p = r.data || [];
      setPools(p);
      if (p.length) {
        const [t, inv] = await Promise.all([teamService.getMyTeam(p[0].id), teamService.getMyInvites(p[0].id)]);
        setMyTeam(t); setInviteCount(inv?.length || 0);
      }
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  const pool = pools[0];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      {pool && <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="font-medium text-blue-800">{pool.name}</p>
        <p className="text-sm text-blue-600">Phase: <Badge text={pool.status} /></p>
      </div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div onClick={() => navigate('/projects')} className="bg-white rounded-xl border p-5 cursor-pointer hover:shadow-md transition-shadow">
          <GraduationCap className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-semibold">Browse Projects</h3>
          <p className="text-sm text-gray-500 mt-1">View approved projects</p>
        </div>
        <div onClick={() => navigate('/my-team')} className="bg-white rounded-xl border p-5 cursor-pointer hover:shadow-md transition-shadow relative">
          <Users className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold">{myTeam ? 'My Team' : 'Form Team'}</h3>
          <p className="text-sm text-gray-500 mt-1">{myTeam ? myTeam.name : 'Create or join a team'}</p>
          {inviteCount > 0 && <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{inviteCount}</span>}
        </div>
        <div onClick={() => navigate('/ideas')} className="bg-white rounded-xl border p-5 cursor-pointer hover:shadow-md transition-shadow">
          <Lightbulb className="w-8 h-8 text-yellow-500 mb-3" />
          <h3 className="font-semibold">Submit Idea</h3>
          <p className="text-sm text-gray-500 mt-1">Propose your own project</p>
        </div>
      </div>

      {myTeam && (
        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold mb-3">My Team: {myTeam.name}</h3>
          <div className="flex items-center gap-3 mb-3"><Badge text={myTeam.status} />{myTeam.project && <span className="text-sm text-green-700">Project: {myTeam.project.title}</span>}</div>
          <div className="space-y-2">
            {myTeam.members?.filter(m => m.status === 'ACTIVE').map(m => (
              <div key={m.id} className="flex items-center gap-3 text-sm">
                <span className="font-medium">{m.student.firstName} {m.student.lastName}</span>
                <span className="text-gray-500 font-mono">{m.student.enrollmentNo}</span>
                {m.role === 'LEADER' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Leader</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;