import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetOneConversationValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getOneConversationValidation = {
  params,
};
