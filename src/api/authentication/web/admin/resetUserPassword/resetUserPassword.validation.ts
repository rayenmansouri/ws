import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";

const body = z.object({
  newPassword: z.string().min(8),
  userNewId: validateNewId(),
  userType: z.enum([
    END_USER_ENUM.ADMIN,
    END_USER_ENUM.TEACHER,
    END_USER_ENUM.STUDENT,
    END_USER_ENUM.PARENT,
  ]),
});
type TBody = z.infer<typeof body>;

export type ResetUserPasswordValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const resetUserPasswordValidation = {
  body,
};
