import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";
import { z } from "zod";

const query = z
  .object({
    search: z.string().optional(),
    levelNewIds: z.array(validateNewId()).optional(),
    hasSections: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListSubLevelsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listSubLevelsValidation = {
  query,
};
