export type PaginationMeta = {
  limit: number | null;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  hasMore: boolean;
  totalDocs: number;
  totalPages: number | null;
  page: number | null;
  nextPage: number | null;
  prevPage: number | null;
};

export type ResponseWithPagination<T> = {
  docs: T[];
  meta: PaginationMeta;
};
