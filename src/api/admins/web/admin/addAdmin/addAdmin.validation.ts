import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { baseUserValidation } from "../../../../users/shared/validation/user.validation";

const body = baseUserValidation
  .merge(
    z.object({
      roles: z.array(validateID()),
    }),
  )
  .refine(value => value.email || value.phoneNumber, {
    message: "either phone number or email are required",
  });
type TBody = z.infer<typeof body>;

export type AddAdminValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addAdminValidation = {
  body,
};
