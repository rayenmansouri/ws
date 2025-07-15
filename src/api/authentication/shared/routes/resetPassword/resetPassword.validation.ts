import { z } from "zod";
import { validatePhoneNumber, emailValidation } from "../../../../../core/validator";

const body = z.object({
  credential: z.union([validatePhoneNumber(), emailValidation()]),
  newPassword: z.string().min(8),
  confirmationCode: z.coerce
    .number()
    .int()
    .max(9999)
    .min(1000)
    .transform(n => n.toString()),
});
type TBody = z.infer<typeof body>;

export type ResetPasswordValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const resetPasswordValidation = {
  body,
};
