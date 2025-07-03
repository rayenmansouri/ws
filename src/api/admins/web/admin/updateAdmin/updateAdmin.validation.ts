import { z } from "zod";
import {
  emailValidation,
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";

const body = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.nativeEnum(GENDER_ENUM).optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  phoneNumber: validatePhoneNumber().optional().nullable(),
  birthDate: validateDate().optional(),
  email: emailValidation().optional().nullable(),
  roles: z.array(validateID()).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  adminNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateAdminValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateAdminValidation = {
  body,
  params,
};
