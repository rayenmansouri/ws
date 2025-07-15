import { z } from "zod";
import { paginationOptionsValidation } from "./../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    isGroup: z.boolean().optional(),
    isSeen: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListConversationsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listConversationsValidation = { query };
