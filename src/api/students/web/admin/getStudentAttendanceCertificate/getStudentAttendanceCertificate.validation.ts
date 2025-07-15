import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetStudentAttendanceCertificateValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getStudentAttendanceCertificateValidation = {
  params,
};
