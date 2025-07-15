import { z } from "zod";
import {
  EDUCATION_DEPARTMENT_ENUM,
  GRADE_REPORT_THEM_ENUM,
} from "../../../../../feature/schools/domain/school.entity";
import { emailValidation, validateDate, validatePhoneNumber } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    phoneNumber: validatePhoneNumber(),
    email: emailValidation(),
    address: z.string(),
    dueDate: z.coerce.number(),
    educationDepartment: z.nativeEnum(EDUCATION_DEPARTMENT_ENUM),
    gradeBookTheme: z.nativeEnum(GRADE_REPORT_THEM_ENUM),
    days: z.array(z.coerce.number()),
    startHour: validateDate().transform(value => value.getHours()),
    endHour: validateDate().transform(value => value.getHours()),
    step: z.string().optional(),
    directorName: z.string().optional(),
  })
  .partial();
type TBody = z.infer<typeof body>;

export type UpdateSchoolValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const updateSchoolValidation = {
  body,
};
