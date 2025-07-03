import { z } from "zod";
import { validatePhoneNumber } from "../../../../../core/validator";
import {
  EDUCATION_DEPARTMENT_ENUM,
  GRADE_REPORT_THEM_ENUM,
  INSTANCE_TYPE_ENUM,
} from "../../../../../feature/schools/domain/school.entity";

const body = z.object({
  name: z.string(),
  subdomain: z.string(),
  email: z.string().email().optional(),
  phoneNumber: validatePhoneNumber(),
  address: z.string().optional(),
  directorName: z.string().optional(),
  configName: z.string().optional(),
  dueDate: z.number(),
  taxRate: z.number(),
  maxStudentSeats: z.number(),
  gradeBookTheme: z.nativeEnum(GRADE_REPORT_THEM_ENUM),
  enableSms: z.boolean(),
  enableEmail: z.boolean(),
  educationDepartment: z.nativeEnum(EDUCATION_DEPARTMENT_ENUM),
  instanceType: z.nativeEnum(INSTANCE_TYPE_ENUM),
});
type TBody = z.infer<typeof body>;

export type AddSchoolValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSchoolValidation = {
  body,
};
