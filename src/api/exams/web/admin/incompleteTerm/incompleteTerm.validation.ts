import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  termNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const body = z.object({});
type TBody = z.infer<typeof body>;

export type IncompleteTermValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const incompleteTermValidation = {
  params,
  body,
};
