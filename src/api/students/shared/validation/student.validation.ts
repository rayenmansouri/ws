import { z } from "zod";
import { validateID } from "../../../../core/validator";
import { baseUserValidation } from "../../../users/shared/validation/user.validation";

export const studentValidation = baseUserValidation.merge(
  z.object({
    parents: z
      .array(validateID())
      .min(0)
      .max(5)
      .refine(value => new Set(value).size === value.length, "duplicate parents"),
    level: validateID(),
    classType: validateID(),
    nextClassType: validateID().optional(),
    uniqueId: z.string().optional(),
  }),
);
