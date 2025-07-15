import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  termNewId: validateNewId(),
  grades: z.record(z.string(), z.record(z.string(), z.string().or(z.null()))),
  observations: z.record(z.string(), z.string()),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
  fieldIndex: z.string(),
});
type TParams = z.infer<typeof params>;

export type UpdatePrimaryGradesValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updatePrimaryGradesValidation = {
  body,
  params,
};
