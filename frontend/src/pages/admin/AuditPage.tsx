// frontend/src/pages/admin/AuditPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { auditService } from '@/services/auditService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search, Filter, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Pagination } from '@/types';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  ipAddress?: string;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string; role: string };
}

const AuditPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [entityFilter, setEntityFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: '25' };
      if (entityFilter) params.entityType = entityFilter;
      const res = await auditService.list(params);
      setLogs(res.data || []);
      setPagination(res.pagination);
    } catch {}
    finally { setLoading(false); }
  }, [page, entityFilter]);

  useEffect(() => { load(); }, [load]);

  const actionColors: Record<string, string> = {
    CREATE: 'bg-green-100 text-green-700',
    UPDATE: 'bg-blue-100 text-blue-700',
    DELETE: 'bg-red-100 text-red-700',
    LOGIN: 'bg-purple-100 text-purple-700',
    APPROVE: 'bg-green-100 text-green-700',
    REJECT: 'bg-red-100 text-red-700',
    LOCK: 'bg-cyan-100 text-cyan-700',
    HOLD: 'bg-yellow-100 text-yellow-700',
    FREEZE: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold">Audit Logs</h1>
        </div>
        <select value={entityFilter} onChange={e => { setEntityFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border rounded-lg text-sm outline-none">
          <option value="">All Entities</option>
          <option value="USER">Users</option>
          <option value="POOL">Pools</option>
          <option value="PROJECT">Projects</option>
          <option value="TEAM">Teams</option>
          <option value="IDEA">Ideas</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {loading ? <LoadingSpinner /> : logs.length === 0 ? <EmptyState title="No audit logs" /> : (
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    <div className="text-xs">{new Date(log.createdAt).toLocaleDateString()}</div>
                    <div className="text-[11px] text-gray-400">{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{log.user.firstName} {log.user.lastName}</p>
                    <p className="text-xs text-gray-500">{log.user.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-700'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700">{log.entityType}</span>
                    {log.entityId && <span className="text-xs text-gray-400 ml-1 font-mono">#{log.entityId.substring(0, 8)}</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">{log.ipAddress || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <span className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages}</span>
            <div className="flex gap-2">
              <button disabled={!pagination.hasPrev} onClick={() => setPage(p => p - 1)} className="p-1.5 border rounded bg-white disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={!pagination.hasNext} onClick={() => setPage(p => p + 1)} className="p-1.5 border rounded bg-white disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditPage;