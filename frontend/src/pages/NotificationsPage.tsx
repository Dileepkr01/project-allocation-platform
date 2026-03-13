// frontend/src/pages/NotificationsPage.tsx
import React, { useState, useEffect } from 'react';
import { notificationService } from '@/services/notificationService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import type { Notification, Pagination } from '@/types';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true);
    try {
      const res = await notificationService.list(page);
      setNotifications(res.data || []);
      setPagination(res.pagination);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page]);

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All marked as read');
  };

  const markRead = async (id: string) => {
    await notificationService.markRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Notifications</h1>
        <button onClick={markAllRead} className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50">
          <CheckCheck className="w-4 h-4" />Mark all read
        </button>
      </div>

      {notifications.length === 0 ? <EmptyState title="No notifications" /> : (
        <div className="bg-white rounded-xl border overflow-hidden divide-y">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => !n.isRead && markRead(n.id)}
              className={`px-5 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${!n.isRead ? 'bg-blue-50/40' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm ${!n.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                    {!n.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button disabled={!pagination.hasPrev} onClick={() => setPage(p => p - 1)}
            className="p-2 border rounded bg-white disabled:opacity-40 hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">Page {pagination.page} of {pagination.totalPages}</span>
          <button disabled={!pagination.hasNext} onClick={() => setPage(p => p + 1)}
            className="p-2 border rounded bg-white disabled:opacity-40 hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;