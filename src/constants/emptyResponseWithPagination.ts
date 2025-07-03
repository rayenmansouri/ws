import { ResponseWithPagination } from "../database/mongo/types";

export const EMPTY_RESPONSE_WITH_PAGINATION = <
  T
>(): ResponseWithPagination<T> => ({
  docs: [],
  meta: {
    hasMore: false,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    page: 1,
    prevPage: null,
    totalDocs: 0,
    totalPages: 1,
  },
});
