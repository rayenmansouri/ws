import { z } from "zod";
import { END_USER_WITHOUT_MASTER_ENUM, NO_SPACE_REGEX } from "../../../../../constants/globalEnums";
import { CustomValidation } from "../../../../../core/validation/custom.validation";
import { validateNewId } from "../../../../../core/validator";
import { CATEGORIES_ENUM } from "../../../../../feature/announcements/domain/post.entity";

const body = z.object({
  userTypes: z.array(z.nativeEnum(END_USER_WITHOUT_MASTER_ENUM)).min(1),
  category: z.nativeEnum(CATEGORIES_ENUM).optional(),
  hashTags: z.array(z.string().regex(NO_SPACE_REGEX)).optional(),
  levels: z.array(validateNewId()).optional(),
  groups: z.array(validateNewId()).optional(),
  classes: z.array(validateNewId()).optional(),
  content: CustomValidation.validateHTML().optional(),
  isCommentsAllowed: z
    .string()
    .transform(value => value === "true")
    .or(z.boolean())
    .optional(),
  deleteAttachments: z.array(z.string()).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  postNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdatePostValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updatePostValidation = {
  body,
  params,
};
