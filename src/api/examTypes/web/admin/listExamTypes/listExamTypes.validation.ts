import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    name: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListExamTypesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listExamTypesValidation = {
  query,
};
