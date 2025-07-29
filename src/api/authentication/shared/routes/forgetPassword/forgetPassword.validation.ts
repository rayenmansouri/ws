import { z } from "zod";
import { emailValidation, validatePhoneNumber } from "../../../../../core/validator";

const body = z.object({
  credential: z.union([validatePhoneNumber(), emailValidation()]),
  subdomain: z.string(),
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
