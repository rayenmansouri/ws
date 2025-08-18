import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

export const listLevelsValidation = {
  query: z.object({
    search: z.string().optional(),
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
  }).merge(paginationOptionsValidation)
};

export type ListLevelsValidation = z.infer<typeof listLevelsValidation.query>;
