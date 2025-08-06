// Compatibility types for pagination and database responses
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ResponseWithPagination<T = any> {
  data: T[];
  meta: PaginationMeta;
}

// Legacy exports for backward compatibility
export type { PaginationMeta as PaginationMetadata };
export type { ResponseWithPagination as PaginatedResponse };