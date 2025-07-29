import { z } from "zod";
import { validateID, validateNewId } from "./../../../../../core/validator";
import { ATTENDANCE_ENUM } from "../../../../../feature/sessionManagement/domain/session.entity";

const body = z.object({
  studentId: validateID(),
  newStatus: z.nativeEnum(ATTENDANCE_ENUM),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ConfirmAttendanceValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const confirmAttendanceValidation = {
  body,
  params,
};
