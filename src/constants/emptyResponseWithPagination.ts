export type ResponseWithPagination<T> = {
  docs: T[];
  meta: PaginationMeta;
};

export type PaginationMeta = {
    hasMore: false,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 1,
  };
