import { z } from "zod";
import { validatePhoneNumber } from "../../../../../core/validator";
import {
  EDUCATION_DEPARTMENT_ENUM,
  GRADE_REPORT_THEM_ENUM,
} from "../../../../../feature/schools/domain/school.entity";

const body = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: validatePhoneNumber().optional(),
  address: z.string().optional(),
  directorName: z.string().optional(),
  dueDate: z.number().optional(),
  taxRate: z.number().optional(),
  maxStudentSeats: z.number().optional(),
  gradeBookTheme: z.nativeEnum(GRADE_REPORT_THEM_ENUM).optional(),
  enableSms: z.boolean().optional(),
  enableEmail: z.boolean().optional(),
  educationDepartment: z.nativeEnum(EDUCATION_DEPARTMENT_ENUM).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  schoolNewId: z.string(),
});
type TParams = z.infer<typeof params>;

export type UpdateSchoolValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSchoolValidation = {
  body,
  params,
};
