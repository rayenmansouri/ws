import { validateNewId } from "./../../../../../core/validator";
import { MESSAGE_REACTION_ENUM } from "./../../../../../feature/messages/domain/message.entity";
import { z } from "zod";

const body = z.object({
  reactionType: z.nativeEnum(MESSAGE_REACTION_ENUM).nullable(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  messageNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddReactToMessageValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const AddReactToMessageValidation = {
  body,
  params,
};
