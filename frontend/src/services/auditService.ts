// frontend/src/services/auditService.ts
import api from '@/config/api';

export const auditService = {
  list: async (params: Record<string, string> = {}) => {
    const q = new URLSearchParams(params).toString();
    const { data } = await api.get(`/audit-logs?${q}`);
    return data;
  },
};