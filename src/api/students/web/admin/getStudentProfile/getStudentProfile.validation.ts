import { z } from "zod";
import { validateNewId, validateID } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  schoolYearId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentProfileValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getStudentProfileValidation = {
  params,
  query,
};
