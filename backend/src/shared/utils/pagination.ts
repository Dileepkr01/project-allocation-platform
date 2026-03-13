export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const parsePagination = (query: any): PaginationParams => ({
  page: Math.max(1, parseInt(query.page) || 1),
  limit: Math.min(100, Math.max(1, parseInt(query.limit) || 20)),
  sortBy: query.sortBy || 'createdAt',
  sortOrder: query.sortOrder === 'asc' ? 'asc' : 'desc',
});

export const paginatedResult = <T>(data: T[], total: number, params: PaginationParams): PaginatedResult<T> => {
  const totalPages = Math.ceil(total / params.limit);
  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
};