import { z } from "zod";
import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";
import { validatePhoneNumber } from "../../../../../core/validator";

const body = z.object({
  data: z.array(
    z.object({
      studentFirstName: z.string(),
      studentLastName: z.string(),
      studentGender: z.nativeEnum(GENDER_ENUM),
      studentEmail: z.string().email().optional(),
      studentPhoneNumber: validatePhoneNumber().optional(),
      studentAddress: z.string().optional(),
      studentLevel: z.string(),
      studentClassType: z.string(),
      parentFirstName: z.string(),
      parentLastName: z.string(),
      parentGender: z.nativeEnum(GENDER_ENUM),
      parentEmail: z.string().email().optional(),
      parentPhoneNumber: validatePhoneNumber().optional(),
      parentAddress: z.string().optional(),
    }),
  ),
});
type TBody = z.infer<typeof body>;

export type ImportStudentsValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const importStudentsValidation = {
  body,
};
