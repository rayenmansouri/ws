import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { LANGUAGE_ENUM } from "../../../../../translation/constants";

const body = z.object({
  name: z.string(),
  userTypes: z.array(z.nativeEnum(END_USER_ENUM)).min(1),
  permissions: z.array(z.string()),
  translation: z.object({
    [LANGUAGE_ENUM.ARABIC]: z.string(),
    [LANGUAGE_ENUM.ENGLISH]: z.string(),
    [LANGUAGE_ENUM.FRENCH]: z.string(),
  }),
});
type TBody = z.infer<typeof body>;

export type AddRoleValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addRoleValidation = {
  body,
};
