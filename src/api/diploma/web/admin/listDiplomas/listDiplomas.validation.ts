import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListDiplomasValidation = {
  query: TQuery;
  params: never;
  body: never;
};

export const listDiplomasValidation = {
  query,
};
