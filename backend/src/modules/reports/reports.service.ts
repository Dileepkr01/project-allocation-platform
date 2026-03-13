import prisma from '../../config/database';
import { NotFoundError } from '../../shared/errors/AppError';

export class ReportsService {

  async getTeamReport(poolId: string) {
    const pool = await prisma.pool.findUnique({ where: { id: poolId } });
    if (!pool) throw new NotFoundError('Pool not found');

    const teams = await prisma.team.findMany({
      where: { poolId, status: { not: 'DISSOLVED' } },
      include: {
        project: { include: { faculty: { select: { firstName: true, lastName: true, email: true } } } },
        members: { where: { status: 'ACTIVE' }, include: { student: { select: { firstName: true, lastName: true, email: true, enrollmentNo: true } } }, orderBy: { role: 'asc' } },
        leader: { select: { firstName: true, lastName: true } },
      },
      orderBy: { name: 'asc' },
    });

    return { pool: { id: pool.id, name: pool.name, academicYear: pool.academicYear, semester: pool.semester }, teams, generatedAt: new Date() };
  }

  async getAllocationSummary(poolId: string) {
    const pool = await prisma.pool.findUnique({ where: { id: poolId } });
    if (!pool) throw new NotFoundError('Pool not found');

    const [totalStudents, totalFaculty, totalProjects, approvedProjects, totalTeams, frozenTeams, unassignedStudents] = await Promise.all([
      prisma.poolStudent.count({ where: { poolId } }),
      prisma.poolFaculty.count({ where: { poolId } }),
      prisma.project.count({ where: { poolId } }),
      prisma.project.count({ where: { poolId, status: 'APPROVED' } }),
      prisma.team.count({ where: { poolId, status: { not: 'DISSOLVED' } } }),
      prisma.team.count({ where: { poolId, status: 'FROZEN' } }),
      prisma.poolStudent.count({
        where: { poolId, student: { teamMemberships: { none: { team: { poolId }, status: 'ACTIVE' } } } },
      }),
    ]);

    const projectsByStatus = await prisma.project.groupBy({ by: ['status'], _count: { id: true }, where: { poolId } });

    return {
      pool: { id: pool.id, name: pool.name, status: pool.status },
      totalStudents, totalFaculty, totalProjects, approvedProjects, totalTeams, frozenTeams, unassignedStudents,
      projectsByStatus: projectsByStatus.map(p => ({ status: p.status, count: p._count.id })),
      generatedAt: new Date(),
    };
  }

  async getUnassignedStudents(poolId: string) {
    const students = await prisma.poolStudent.findMany({
      where: {
        poolId,
        student: { teamMemberships: { none: { team: { poolId }, status: 'ACTIVE' } } },
      },
      include: { student: { select: { id: true, firstName: true, lastName: true, email: true, enrollmentNo: true, section: true } } },
    });
    return students.map(s => s.student);
  }
}

export const reportsService = new ReportsService();