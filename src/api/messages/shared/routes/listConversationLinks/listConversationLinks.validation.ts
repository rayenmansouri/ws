import { paginationOptionsValidation, validateNewId } from "./../../../../../core/validator";

import { z } from "zod";

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = paginationOptionsValidation;
type TQuery = z.infer<typeof query>;

export type ListConversationLinksValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listConversationLinksValidation = {
  params,
  query,
};
