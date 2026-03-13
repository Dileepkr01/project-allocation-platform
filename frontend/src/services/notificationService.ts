// frontend/src/services/notificationService.ts
import api from '@/config/api';

export const notificationService = {
  list: async (page = 1) => { const { data } = await api.get(`/notifications?page=${page}&limit=20`); return data; },
  unreadCount: async () => { const { data } = await api.get('/notifications/unread-count'); return data.data.count; },
  markRead: async (id: string) => { await api.put(`/notifications/${id}/read`); },
  markAllRead: async () => { await api.put('/notifications/read-all'); },
};