// frontend/src/pages/NotificationsPage.tsx
import React, { useState, useEffect } from 'react';
import { notificationService } from '@/services/notificationService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { CheckCheck, ChevronLeft, ChevronRight, Bell, BellRing, Mail, MailOpen } from 'lucide-react';
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
    } catch { 
      toast.error('Failed to load notifications'); 
    }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [page]);

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = async (id: string) => {
    await notificationService.markRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFCF9]/30 via-[#CADEFC]/20 to-[#C3BEF0]/30 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DEFCF9]/30 via-[#CADEFC]/20 to-[#C3BEF0]/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#C3BEF0] to-[#CCA8E9] rounded-xl shadow-md">
                <Bell className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-gray-500 mt-1">Stay updated with your latest activities</p>
              </div>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={markAllRead} 
                className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-[#CADEFC]/50 rounded-xl text-sm font-medium text-gray-700 hover:bg-white transition-all shadow-md"
              >
                <CheckCheck className="w-4 h-4 text-[#7C3AED]" />
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        {notifications.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#CADEFC]/50 p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{unreadCount}</p>
                  <p className="text-xs text-gray-500">Unread notifications</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#CADEFC]/50 p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <MailOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{notifications.length - unreadCount}</p>
                  <p className="text-xs text-gray-500">Read notifications</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#CADEFC]/50 p-12 text-center shadow-lg">
            <div className="w-20 h-20 bg-[#C3BEF0]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellRing className="w-10 h-10 text-[#7C3AED]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#CADEFC]/50 overflow-hidden shadow-lg">
            <div className="divide-y divide-[#CADEFC]/50">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.isRead && markRead(notification.id)}
                  className={`px-5 py-4 cursor-pointer transition-all duration-200 hover:bg-white/50 ${
                    !notification.isRead ? 'bg-gradient-to-r from-[#C3BEF0]/20 to-[#CCA8E9]/10' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className={`text-sm ${!notification.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                            <Bell className="w-2.5 h-2.5" />
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{notification.message}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button 
              disabled={!pagination.hasPrev} 
              onClick={() => setPage(p => p - 1)}
              className="p-2.5 bg-white/80 backdrop-blur-sm border border-[#CADEFC]/50 rounded-xl text-gray-600 disabled:opacity-40 hover:bg-white transition-all shadow-md disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(Math.min(5, pagination.totalPages))].map((_, idx) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (page <= 3) {
                  pageNum = idx + 1;
                } else if (page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + idx;
                } else {
                  pageNum = page - 2 + idx;
                }
                
                if (pageNum > pagination.totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-[#C3BEF0] to-[#CCA8E9] text-gray-800 shadow-md'
                        : 'bg-white/80 text-gray-600 hover:bg-white border border-[#CADEFC]/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button 
              disabled={!pagination.hasNext} 
              onClick={() => setPage(p => p + 1)}
              className="p-2.5 bg-white/80 backdrop-blur-sm border border-[#CADEFC]/50 rounded-xl text-gray-600 disabled:opacity-40 hover:bg-white transition-all shadow-md disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;