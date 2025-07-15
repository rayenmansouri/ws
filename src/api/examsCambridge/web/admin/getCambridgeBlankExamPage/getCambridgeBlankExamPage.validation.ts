import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  subjectNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetCambridgeBlankExamPageValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getCambridgeBlankExamPageValidation = {
  params,
  query,
};
