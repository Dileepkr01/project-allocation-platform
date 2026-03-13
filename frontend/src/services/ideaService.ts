import api from '@/config/api';
import type { IdeaInput } from '@/types';

export const ideaService = {
  submit: async (poolId: string, body: IdeaInput) => { const { data } = await api.post(`/pools/${poolId}/ideas`, body); return data.data; },
  getMyIdeas: async (poolId: string) => { const { data } = await api.get(`/pools/${poolId}/ideas/mine`); return data.data; },
  listByPool: async (poolId: string) => { const { data } = await api.get(`/pools/${poolId}/ideas`); return data.data; },
  approve: async (poolId: string, id: string, feedback?: string) => { const { data } = await api.post(`/pools/${poolId}/ideas/${id}/approve`, { feedback }); return data; },
  reject: async (poolId: string, id: string, feedback?: string) => { const { data } = await api.post(`/pools/${poolId}/ideas/${id}/reject`, { feedback }); return data; },
};