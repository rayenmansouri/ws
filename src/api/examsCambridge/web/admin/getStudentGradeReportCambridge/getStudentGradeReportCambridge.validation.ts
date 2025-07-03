import { validateID } from "./../../../../../core/validator";
import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
  schoolYearId: validateID(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentGradeReportCambridgeValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getStudentGradeReportCambridgeValidation = {
  params,
  query,
};
