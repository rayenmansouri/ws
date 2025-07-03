import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  userType: z.enum([
    END_USER_ENUM.ADMIN,
    END_USER_ENUM.TEACHER,
    END_USER_ENUM.STUDENT,
    END_USER_ENUM.PARENT,
  ]),
  userNewIds: z.array(validateNewId()),
});
type TBody = z.infer<typeof body>;

export type ResendInvitationValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const resendInvitationValidation = {
  body,
};
