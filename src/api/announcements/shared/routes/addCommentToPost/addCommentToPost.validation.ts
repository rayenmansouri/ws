import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { CustomValidation } from "../../../../../core/validation/custom.validation";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";

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
  postNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddCommentToPostValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addCommentToPostValidation = {
  body,
  params,
};
