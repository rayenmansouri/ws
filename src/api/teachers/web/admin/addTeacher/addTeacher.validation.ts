import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { baseUserValidation } from "../../../../users/shared/validation/user.validation";

const body = baseUserValidation
  .merge(
    z.object({
      levels: z
        .array(validateID())
        .refine(value => new Set(value).size === value.length, "duplicate levels"),
      subjectTypes: z
        .array(validateID())
        .refine(value => new Set(value).size === value.length, "duplicate subjectTypes")
        .optional(),
      groupTypes: z
        .array(validateID())
        .refine(value => new Set(value).size === value.length, "duplicate groupTypes")
        .optional(),
      roles: z
        .array(validateID())
        .refine(value => new Set(value).size === value.length, "duplicate roles")
        .optional(),
    }),
  )
  .refine(value => value.email || value.phoneNumber, {
    message: "either phone number or email are required",
  });
type TBody = z.infer<typeof body>;

export type AddTeacherValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addTeacherValidation = {
  body,
};
