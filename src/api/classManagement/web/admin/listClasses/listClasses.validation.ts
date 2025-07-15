import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    levels: z.array(validateNewId()).optional(),
    search: z.string().optional(),
    classTypes: z.array(validateNewId()).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListClassesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listClassesValidation = {
  query,
};
