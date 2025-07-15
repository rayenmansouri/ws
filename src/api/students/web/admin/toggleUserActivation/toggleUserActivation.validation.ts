import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  userType: z.nativeEnum(END_USER_ENUM),
  userNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type ToggleUserActivationValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const toggleUserActivationValidation = {
  body,
};
