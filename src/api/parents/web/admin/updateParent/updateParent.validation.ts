import { z } from "zod";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";
import {
  emailValidation,
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";

const body = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  gender: z.nativeEnum(GENDER_ENUM).optional(),
  address1: z.string().optional().nullable(),
  address2: z.string().optional().nullable(),
  email: emailValidation().nullish(),
  phoneNumber: validatePhoneNumber().nullish(),
  birthDate: validateDate().optional(),
  students: z.array(validateID()).optional(),
  nationalCardId: z.string().length(8).optional().nullable(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  parentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateParentValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateParentValidation = {
  body,
  params,
};
