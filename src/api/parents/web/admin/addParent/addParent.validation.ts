import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { baseUserValidation } from "../../../../users/shared/validation/user.validation";

const body = baseUserValidation
  .merge(
    z.object({
      students: z.array(validateID()).min(0).max(10).optional(),
      nationalCardId: z.string().length(8).optional(),
    }),
  )
  .refine(
    value => {
      return value.email || value.phoneNumber;
    },
    { message: "either phone number or email are required" },
  );
type TBody = z.infer<typeof body>;

export type AddParentValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addParentValidation = {
  body,
};
