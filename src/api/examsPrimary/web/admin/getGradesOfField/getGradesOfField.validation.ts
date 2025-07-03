import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  fieldIndex: z.string(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetGradesOfFieldValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getGradesOfFieldValidation = {
  params,
  query,
};
