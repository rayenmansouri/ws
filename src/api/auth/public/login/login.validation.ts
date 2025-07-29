import { z } from "zod";
import { emailValidation, validatePhoneNumber } from "../../../../core/validator";

const body = z.object({
  credential: z.union([emailValidation(), validatePhoneNumber()]),
  password: z.string().min(8),
});

type TBody = z.infer<typeof body>;

export type LoginValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const loginValidation = {
  body,
}; 