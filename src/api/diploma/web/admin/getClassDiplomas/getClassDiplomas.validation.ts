import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetClassDiplomasValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getClassDiplomasValidation = {
  params,
  query,
};
