import { z } from "zod";
import { END_USER_WITHOUT_MASTER_ENUM, NO_SPACE_REGEX } from "../../../../../constants/globalEnums";
import { CustomValidation } from "../../../../../core/validation/custom.validation";
import { validateDate, validateNewId } from "../../../../../core/validator";
import { CATEGORIES_ENUM } from "../../../../../feature/announcements/domain/post.entity";

export const body = z.object({
  userTypes: z.array(z.nativeEnum(END_USER_WITHOUT_MASTER_ENUM)).min(1),
  category: z.nativeEnum(CATEGORIES_ENUM).optional(),
  hashTags: z.array(z.string().regex(NO_SPACE_REGEX)).optional(),
  scheduleAt: validateDate().optional(),
  levels: z.array(validateNewId()).optional(),
  groups: z.array(validateNewId()).optional(),
  classes: z.array(validateNewId()).optional(),
  content: CustomValidation.validateHTML().optional(),
  isCommentsAllowed: z
    .string()
    .transform(value => value === "true")
    .or(z.boolean())
    .optional(),
});
export type TBody = z.infer<typeof body>;

export type AddPostValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addPostValidation = {
  body,
};
