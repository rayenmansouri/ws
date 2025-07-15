import { z } from "zod";
import { REACTION_TYPE_ENUM } from "../../../../../feature/announcements/domain/reaction.entity";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  reactionType: z.nativeEnum(REACTION_TYPE_ENUM).nullable(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  postNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReactToPostValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reactToPostValidation = {
  body,
  params,
};
