import prisma from '../../config/database';
import { paginatedResult, PaginationParams } from '../../shared/utils/pagination';

export class AuditService {
  async log(userId: string, action: string, entityType: string, entityId?: string, oldValue?: any, newValue?: any, ipAddress?: string, userAgent?: string) {
    return prisma.auditLog.create({ data: { userId, action, entityType, entityId, oldValue, newValue, ipAddress, userAgent } });
  }

  async getLogs(params: PaginationParams, filters?: { userId?: string; entityType?: string; entityId?: string }) {
    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.entityType) where.entityType = filters.entityType;
    if (filters?.entityId) where.entityId = filters.entityId;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where, skip: (params.page - 1) * params.limit, take: params.limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { firstName: true, lastName: true, email: true, role: true } } },
      }),
      prisma.auditLog.count({ where }),
    ]);
    return paginatedResult(logs, total, params);
  }
}

export const auditService = new AuditService();