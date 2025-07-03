import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    hashTags: z.array(z.string()).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListPostsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listPostsValidation = {
  query,
};
