import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    levelNewIds: z.array(validateNewId()).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListGroupsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listGroupsValidation = {
  query,
};
