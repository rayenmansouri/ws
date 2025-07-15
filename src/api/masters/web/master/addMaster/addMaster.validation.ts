import { z } from "zod";
import { validateDate, validateID, validatePhoneNumber } from "../../../../../core/validator";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";

const body = z.object({
  firstName: z.string(),
  lastName: z.string(),
  gender: z.nativeEnum(GENDER_ENUM),
  birthDate: validateDate(),
  email: z.string().email().optional(),
  phoneNumber: validatePhoneNumber().optional(),
  password: z.string().min(10),
  address1: z.string().optional(),
  address2: z.string().optional(),
  roles: z.array(validateID()),
});
type TBody = z.infer<typeof body>;

export type AddMasterValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addMasterValidation = {
  body,
};
