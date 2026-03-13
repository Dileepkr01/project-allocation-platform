// frontend/src/services/teamService.ts
import api from '@/config/api';

export const teamService = {
  create: async (poolId: string, name: string) => { const { data } = await api.post(`/pools/${poolId}/teams`, { name }); return data.data; },
  listByPool: async (poolId: string) => { const { data } = await api.get(`/pools/${poolId}/teams`); return data.data; },
  getMyTeam: async (poolId: string) => { const { data } = await api.get(`/pools/${poolId}/my-team`); return data.data; },
  getMyInvites: async (poolId: string) => { const { data } = await api.get(`/pools/${poolId}/my-invites`); return data.data; },
  invite: async (poolId: string, teamId: string, studentId: string, message?: string) => { const { data } = await api.post(`/pools/${poolId}/teams/${teamId}/invite`, { studentId, message }); return data; },
  respond: async (poolId: string, inviteId: string, accept: boolean) => { const { data } = await api.post(`/pools/${poolId}/invites/${inviteId}/respond`, { accept }); return data; },
  selectProject: async (poolId: string, teamId: string, projectId: string) => { const { data } = await api.post(`/pools/${poolId}/teams/${teamId}/select-project`, { projectId }); return data; },
  leave: async (poolId: string, teamId: string) => { const { data } = await api.post(`/pools/${poolId}/teams/${teamId}/leave`); return data; },
  removeMember: async (poolId: string, teamId: string, memberId: string) => { const { data } = await api.delete(`/pools/${poolId}/teams/${teamId}/members/${memberId}`); return data; },
  dissolve: async (poolId: string, teamId: string) => { const { data } = await api.post(`/pools/${poolId}/teams/${teamId}/dissolve`); return data; },
};