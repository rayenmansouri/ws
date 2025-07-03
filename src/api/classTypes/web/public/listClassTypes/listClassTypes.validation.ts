import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    levelNewIds: z.array(validateNewId()),
    schoolSubdomain: z.string(),
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListClassTypesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listClassTypesValidation = {
  query,
};
