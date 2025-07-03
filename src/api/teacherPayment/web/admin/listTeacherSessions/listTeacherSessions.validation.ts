import { validateNewId } from "../../../../../core/validator";
import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";
import { TEACHER_ATTENDANCE_STATUS_ENUM } from "../../../../../feature/sessionManagement/domain/session.entity";

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z
  .object({
    month: z.coerce.number().min(0).max(11).default(new Date().getMonth()).optional(),
    year: z.coerce.number().min(2000).max(3000).default(new Date().getFullYear()),
    attendanceStatus: z.nativeEnum(TEACHER_ATTENDANCE_STATUS_ENUM).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListTeacherSessionsValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listTeacherSessionsValidation = {
  params,
  query,
};
