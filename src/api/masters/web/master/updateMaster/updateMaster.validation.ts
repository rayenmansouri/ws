import { z } from "zod";
import {
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
  birthDate: validateDate().optional(),
  email: z.string().email().optional(),
  phoneNumber: validatePhoneNumber().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  roles: z.array(validateID()).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  masterNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateMasterValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateMasterValidation = {
  body,
  params,
};
