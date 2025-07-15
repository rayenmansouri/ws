import { REACTION_TYPE_ENUM } from "../../../../../feature/announcements/domain/reaction.entity";
import { validateNewId } from "../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  reactionType: z.nativeEnum(REACTION_TYPE_ENUM).nullable(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  commentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReactToCommentValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reactToCommentValidation = {
  body,
  params,
};
