import { PaginationMeta } from "../newDatabase/mongo/types";

/**
 * Function to slice an array given a limit and page
 * @param array input array
 * @param limit how many records to return
 * @param page page to discard elements
 * @returns sliced array or empty if input is null or has length = 0 or even if the params (limit/page) exceeds the array length
 */
export function paginateResult<T = any>(
  array: T[],
  limit = 10,
  page = 1,
): { docs: T[]; meta: PaginationMeta } {
  const start = (page - 1) * limit;
  const end = start + limit;
  const totalPages = Math.ceil(array.length / limit);
  const nextPage = page + 1 <= totalPages ? page + 1 : null;
  return {
    docs: array.slice(start, end),
    meta: {
      limit,
      page: page,
      totalDocs: array.length,
      totalPages,
      nextPage,
      hasNextPage: !!nextPage,
      hasMore: !!nextPage,
      hasPrevPage: page > 1 ? true : false,
      prevPage: page > 1 ? page - 1 : null,
    },
  };
}
