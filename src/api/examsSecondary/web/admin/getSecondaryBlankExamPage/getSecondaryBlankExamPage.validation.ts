import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  subjectNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  subSubjectNewId: validateNewId().optional(),
  termNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetSecondaryBlankExamPageValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getSecondaryBlankExamPageValidation = {
  params,
  query,
};
