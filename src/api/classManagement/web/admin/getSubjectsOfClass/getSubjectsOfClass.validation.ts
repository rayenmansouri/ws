import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetSubjectsOfClassValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getSubjectsOfClassValidation = {
  params,
};
