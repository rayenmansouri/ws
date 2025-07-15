import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  termNewId: validateNewId(),
  subSubjectNewId: validateNewId().optional(),
  grades: z.record(z.string(), z.record(z.string(), z.string().or(z.null()))),
  observations: z.record(z.string(), z.string()),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
  subjectNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSecondaryGradesValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSecondaryGradesValidation = {
  body,
  params,
};
