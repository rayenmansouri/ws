import { z } from "zod";
import { CustomValidation } from "../../../../../core/validation/custom.validation";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  content: CustomValidation.validateHTML().optional(),
  mentions: z
    .array(
      z.object({
        type: z.nativeEnum(END_USER_ENUM),
        newId: validateNewId(),
      }),
    )
    .optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  commentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddReplyToCommentValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addReplyToCommentValidation = {
  body,
  params,
};
