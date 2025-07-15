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
  address1: z.string().optional().nullable(),
  address2: z.string().optional().nullable(),
  phoneNumber: validatePhoneNumber().optional().nullable(),
  birthDate: validateDate().optional(),
  email: emailValidation().optional().nullable(),
  classTypes: z.array(validateID()).optional(),
  subjectTypes: z.array(validateID()).optional(),
  groupTypes: z.array(validateID()).optional(),
  levels: z.array(validateID()).optional(),
  notAvailableTimes: z
    .array(
      z.object({
        day: z.number().min(0).max(6),
        hours: z.array(z.number().min(8).max(18)),
        isAvailable: z.boolean(),
      }),
    )
    .optional(),
  roles: z
    .array(validateID())
    .refine(value => new Set(value).size === value.length, "duplicate roles")
    .optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateTeacherValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTeacherValidation = {
  body,
  params,
};
