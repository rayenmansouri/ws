import { paginationOptionsValidation } from "../../../../../core/validator";
import { z } from "zod";

const query = z
  .object({
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListSubjectTypesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listSubjectTypesValidation = {
  query,
};
