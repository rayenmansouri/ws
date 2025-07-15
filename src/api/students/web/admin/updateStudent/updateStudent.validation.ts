import { z } from "zod";
import {
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";

const body = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  gender: z.nativeEnum(GENDER_ENUM).optional(),
  address1: z.string().min(1).max(250).optional().nullable(),
  address2: z.string().min(1).max(250).optional().nullable(),
  note: z.string().optional().nullable(),
  phoneNumber: validatePhoneNumber().nullish(),
  birthDate: validateDate().optional(),
  email: z.string().email().nullish(),
  level: validateID().optional(),
  classType: validateID().optional(),
  parents: z
    .array(validateID())
    .min(0)
    .transform(value => Array.from(new Set(value)))
    .optional(),
  uniqueId: z.string().min(1).optional().nullable(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateStudentValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateStudentValidation = {
  body,
  params,
};
