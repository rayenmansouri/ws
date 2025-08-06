// Temporary types for compatibility
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ResponseWithPagination<T> {
  data: T[];
  meta: PaginationMeta;
}