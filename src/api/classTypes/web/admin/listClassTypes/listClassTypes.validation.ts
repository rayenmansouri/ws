import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    sectionNewIds: z.array(validateNewId()).optional(),
    levelNewIds: z.array(validateNewId()).optional(),
    subLevelNewIds: z.array(validateNewId()).optional(),
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
