import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const params = z.object({
  parentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  studentNewId: validateNewId().optional(),
  schoolYearId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetStudentInvoicesValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getStudentInvoicesValidation = {
  params,
  query,
};
