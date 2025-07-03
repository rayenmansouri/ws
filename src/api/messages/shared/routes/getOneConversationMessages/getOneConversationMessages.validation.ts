import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  participants: z.array(validateID()).min(1),
});
type TBody = z.infer<typeof body>;

export type GetOneConversationMessagesValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const getOneConversationMessagesValidation = {
  body,
};
