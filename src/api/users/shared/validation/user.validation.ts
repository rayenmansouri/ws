import { z } from "zod";
import { emailValidation, validateDate, validatePhoneNumber } from "../../../../core/validator";

export const baseUserValidation = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  gender: z.enum(["male", "female"]),
  email: emailValidation().optional(),
  phoneNumber: validatePhoneNumber().optional(),
  address1: z.string().min(1).max(250).optional(),
  address2: z.string().min(1).max(250).optional(),
  birthDate: validateDate().optional(),
  password: z.string().min(8),
});
