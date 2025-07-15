import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  childNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetSecondaryChildGradeReportValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getSecondaryChildGradeReportValidation = {
  params,
  query,
};
