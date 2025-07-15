import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    subLevelNewId: validateNewId(),
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListNextClassTypesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listNextClassTypesValidation = {
  query,
};
