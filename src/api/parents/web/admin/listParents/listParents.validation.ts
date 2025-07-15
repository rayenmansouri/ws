import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    isArchived: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListParentsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listParentsValidation = {
  query,
};
