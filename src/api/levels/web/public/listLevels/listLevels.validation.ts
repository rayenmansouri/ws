import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    schoolSubdomain: z.string(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListLevelsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listLevelsValidation = {
  query,
};
