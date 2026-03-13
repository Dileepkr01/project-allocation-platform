// frontend/src/services/authService.ts
import api from '@/config/api';

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data;
  },
  logout: async () => { await api.post('/auth/logout'); },
  getMe: async () => { const { data } = await api.get('/auth/me'); return data.data; },
  changePassword: async (oldPassword: string, newPassword: string) => {
    await api.put('/auth/change-password', { oldPassword, newPassword });
  },
};