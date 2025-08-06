// Temporary types for compatibility
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  totalDocs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface ResponseWithPagination<T> {
  data: T[];
  docs: T[];
  meta: PaginationMeta;
}