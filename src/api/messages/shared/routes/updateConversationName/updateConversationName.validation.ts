import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  name: z.string().min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateConversationNameValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateConversationNameValidation = {
  body,
  params,
};
