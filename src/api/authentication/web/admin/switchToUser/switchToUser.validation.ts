import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";

const body = z.object({
  userType: z.enum([END_USER_ENUM.TEACHER, END_USER_ENUM.STUDENT, END_USER_ENUM.PARENT]),
  userId: validateID(),
});
type TBody = z.infer<typeof body>;

export type SwitchToUserValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const switchToUserValidation = {
  body,
};
