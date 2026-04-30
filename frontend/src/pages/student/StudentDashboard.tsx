// frontend/src/pages/student/StudentDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { poolService } from '@/services/poolService';
import { teamService } from '@/services/teamService';
import { Badge } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import {
  GraduationCap, Users, Lightbulb, Mail, ArrowRight,
  Sparkles, BookOpen, Clock, CheckCircle2, Zap
} from 'lucide-react';
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

  const phaseInfo = (status: string) => {
    switch (status) {
      case 'SUBMISSION_OPEN': return { label: 'Submissions Open', color: 'text-blue-600 bg-blue-50 border-blue-200', desc: 'Faculty are submitting proposals' };
      case 'UNDER_REVIEW': return { label: 'Under Review', color: 'text-amber-600 bg-amber-50 border-amber-200', desc: 'Subadmins are reviewing proposals' };
      case 'DECISION_PENDING': return { label: 'Decision Pending', color: 'text-orange-600 bg-orange-50 border-orange-200', desc: 'Admin is making final decisions' };
      case 'SELECTION_OPEN': return { label: 'Selection Open', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', desc: 'Browse and select your project!' };
      case 'TEAMS_FORMING': return { label: 'Teams Forming', color: 'text-teal-600 bg-teal-50 border-teal-200', desc: 'Complete your team now' };
      case 'FROZEN': return { label: 'Frozen', color: 'text-cyan-600 bg-cyan-50 border-cyan-200', desc: 'Allocation complete' };
      default: return { label: status, color: 'text-slate-600 bg-slate-50 border-slate-200', desc: '' };
    }
  };

  const phase = pool ? phaseInfo(pool.status) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-teal-900 dark:text-white">Student Hub</h1>
        <p className="text-sm text-teal-700/60 dark:text-slate-400 mt-0.5">Your project allocation dashboard</p>
      </div>

      {/* Pool Status Banner */}
      {pool && phase && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-500 p-7 text-white animate-fade-in-up">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl translate-x-10 -translate-y-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300 rounded-full blur-3xl -translate-x-5 translate-y-5" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span className="text-xs font-semibold text-teal-100 uppercase tracking-wider">{pool.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{phase.label}</h2>
                <p className="text-teal-100 mt-1">{phase.desc}</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                  <p className="text-xs text-teal-100">Current Phase</p>
                </div>
              </div>
            </div>

            {/* Phase Timeline */}
            <div className="mt-6 flex items-center gap-1">
              {['SUBMISSION_OPEN', 'UNDER_REVIEW', 'DECISION_PENDING', 'SELECTION_OPEN', 'TEAMS_FORMING', 'FROZEN'].map((s, i, arr) => {
                const phases = arr;
                const currentIdx = phases.indexOf(pool.status);
                const thisIdx = i;
                const isDone = thisIdx < currentIdx;
                const isCurrent = thisIdx === currentIdx;
                return (
                  <React.Fragment key={s}>
                    <div className={`h-2 flex-1 rounded-full transition-all ${
                      isDone ? 'bg-white' : isCurrent ? 'bg-white/80 animate-pulse' : 'bg-white/20'
                    }`} />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger-children">
        <div
          onClick={() => navigate('/projects')}
          className="group relative bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-teal-100 dark:border-teal-500/20 p-6 cursor-pointer hover:border-teal-400 dark:hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-100/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200/50">
              <GraduationCap className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-teal-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-stone-800 dark:text-white text-lg">Browse Projects</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 mt-1.5 leading-relaxed">Explore approved projects and find your match</p>
        </div>

        <div
          onClick={() => navigate('/my-team')}
          className="group relative bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-emerald-100 dark:border-emerald-500/20 p-6 cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-100/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200/50">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              {inviteCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold animate-pulse shadow-lg shadow-red-200">
                  {inviteCount} new
                </span>
              )}
              <ArrowRight className="w-5 h-5 text-emerald-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
          <h3 className="font-bold text-stone-800 dark:text-white text-lg">{myTeam ? 'My Team' : 'Form Team'}</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 mt-1.5 leading-relaxed">{myTeam ? `Team: ${myTeam.name}` : 'Create or join a team with peers'}</p>
        </div>

        <div
          onClick={() => navigate('/ideas')}
          className="group relative bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-amber-100 dark:border-amber-500/20 p-6 cursor-pointer hover:border-amber-400 dark:hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-100/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200/50">
              <Lightbulb className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-amber-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-stone-800 dark:text-white text-lg">Submit Idea</h3>
          <p className="text-sm text-stone-500 dark:text-slate-400 mt-1.5 leading-relaxed">Propose your own project idea to admins</p>
        </div>
      </div>

      {/* Team Info */}
      {myTeam && (
        <div className="bg-cream-50 dark:bg-slate-800 rounded-2xl border-2 border-teal-100 dark:border-teal-500/20 overflow-hidden">
          <div className="px-6 py-4 border-b border-teal-100 dark:border-teal-500/20 bg-gradient-to-r from-teal-50 dark:from-teal-500/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 dark:bg-teal-500/15 rounded-lg">
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-teal-900 dark:text-white">{myTeam.name}</h3>
                <p className="text-xs text-teal-600">{myTeam.members?.filter(m => m.status === 'ACTIVE').length || 0} active members</p>
              </div>
            </div>
            <Badge text={myTeam.status} />
          </div>
          <div className="p-6">
            {myTeam.project && (
              <div className="flex items-center gap-3 mb-5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-500/20">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-emerald-600 font-medium">Selected Project</p>
                  <p className="font-semibold text-emerald-900 dark:text-emerald-300">{myTeam.project.title}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              {myTeam.members?.filter(m => m.status === 'ACTIVE').map(m => (
                <div key={m.id} className="flex items-center gap-3 bg-cream-100 dark:bg-slate-700/50 rounded-xl p-3 border border-cream-200 dark:border-slate-600">
                  <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {m.student.firstName[0]}{m.student.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-stone-800 dark:text-white">{m.student.firstName} {m.student.lastName}</span>
                      {m.role === 'LEADER' && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">Leader</span>}
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{m.student.enrollmentNo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;