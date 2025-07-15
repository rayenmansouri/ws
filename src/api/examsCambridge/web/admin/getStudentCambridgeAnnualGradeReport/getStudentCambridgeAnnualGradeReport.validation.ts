import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetStudentCambridgeAnnualGradeReportValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getStudentCambridgeAnnualGradeReportValidation = {
  params,
};
