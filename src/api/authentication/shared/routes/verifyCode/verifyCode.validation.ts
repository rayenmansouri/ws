import { z } from "zod";
import { validatePhoneNumber, emailValidation } from "../../../../../core/validator";

const body = z.object({
  credential: z.union([validatePhoneNumber(), emailValidation()]),
  confirmationCode: z.coerce
    .number()
    .int()
    .max(9999)
    .min(1000)
    .transform(n => n.toString()),
  subdomain: z.string(),
});
type TBody = z.infer<typeof body>;

export type VerifyCodeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const verifyCodeValidation = {
  body,
};
