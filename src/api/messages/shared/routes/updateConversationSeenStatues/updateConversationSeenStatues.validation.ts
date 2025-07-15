import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  conversationId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UpdateConversationSeenStatuesValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const updateConversationSeenStatuesValidation = {
  params,
};
