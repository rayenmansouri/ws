import { z } from "zod";

export const listLevelsValidation = {
  query: z.object({
    search: z.string().optional(),
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
  }),
};

export type ListLevelsValidation = z.infer<typeof listLevelsValidation.query>;
