import { ResponseWithPagination } from "../newDatabase/mongo/types";

export const applyMapperToPaginatedResponse = <T, R>(
  data: ResponseWithPagination<T>,
  mapper: (item: T) => R,
): ResponseWithPagination<R> => {
  const docDtos = data.docs.map(mapper);
  return {
    docs: docDtos,
    meta: data.meta,
  };
};
