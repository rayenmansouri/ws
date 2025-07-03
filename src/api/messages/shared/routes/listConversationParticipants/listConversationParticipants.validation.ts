import { CONVERSATION_ROLE } from "./../../../../../feature/messages/domain/conversation.entity";
import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";
import { paginationOptionsValidation } from "./../../../../../core/validator";

const params = z.object({
  conversationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = paginationOptionsValidation.merge(
  z.object({
    role: z.nativeEnum(CONVERSATION_ROLE).optional(),
  }),
);
type TQuery = z.infer<typeof query>;

export type ListConversationParticipantsValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listConversationParticipantsValidation = {
  params,
  query,
};
