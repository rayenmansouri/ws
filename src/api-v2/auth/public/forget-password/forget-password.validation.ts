import { z } from "zod";
import { emailValidation, validatePhoneNumber } from "../../../../core/validator";
import { UserTypeEnum } from "../../../../feature/user-management/factory/enums";

const body = z.object({
  credential: z.union([validatePhoneNumber(), emailValidation()]),
  userType: z.nativeEnum(UserTypeEnum),
});
type TBody = z.infer<typeof body>;

export type ForgetPasswordValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const forgetPasswordValidation = {
  body,
};
