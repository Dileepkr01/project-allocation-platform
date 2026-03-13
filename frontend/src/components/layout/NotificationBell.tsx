// frontend/src/components/layout/NotificationBell.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, CheckCheck, X, ExternalLink } from 'lucide-react';
import { notificationService } from '@/services/notificationService';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import type { Notification } from '@/types';

export const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const loadUnread = async () => {
    try { const c = await notificationService.unreadCount(); setUnread(c); } catch {}
  };

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationService.list(1);
      setNotifications(res.data || []);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => {
    loadUnread();
    const interval = setInterval(loadUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open) loadNotifications();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markRead = async (id: string) => {
    await notificationService.markRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnread(prev => Math.max(0, prev - 1));
  };

  const markAllRead = async () => {
    await notificationService.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnread(0);
  };

  const handleClick = (n: Notification) => {
    if (!n.isRead) markRead(n.id);
    if (n.link) { navigate(n.link); setOpen(false); }
  };

  const typeIcons: Record<string, string> = {
    PROPOSAL_APPROVED: '✅', PROPOSAL_REJECTED: '❌', PROPOSAL_LOCKED: '🔒',
    PROPOSAL_HELD: '⏸️', TEAM_INVITE: '📩', TEAM_INVITE_ACCEPTED: '🤝',
    TEAM_INVITE_DECLINED: '👋', TEAM_FROZEN: '🧊', PROJECT_SELECTED: '🎯',
    IDEA_APPROVED: '💡', IDEA_REJECTED: '🚫', DEADLINE_REMINDER: '⏰',
    POOL_CREATED: '📂', GENERAL: '📢',
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-gray-600" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-2xl border z-50 max-h-[500px] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <CheckCheck className="w-3 h-3" />Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {loading ? (
              <div className="py-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">No notifications yet</div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`px-4 py-3 border-b last:border-0 cursor-pointer transition-colors hover:bg-gray-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex gap-3">
                    <span className="text-lg mt-0.5">{typeIcons[n.type] || '📢'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${!n.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {n.title}
                        </p>
                        {!n.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t px-4 py-2">
            <button
              onClick={() => { navigate('/notifications'); setOpen(false); }}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1 flex items-center justify-center gap-1"
            >
              View all <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};