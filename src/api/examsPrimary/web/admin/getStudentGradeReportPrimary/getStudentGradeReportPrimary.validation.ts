import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
  templateIds: z.array(validateID()).optional(),
  schoolYearId: validateID(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentGradeReportPrimaryValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getStudentGradeReportPrimaryValidation = {
  params,
  query,
};
