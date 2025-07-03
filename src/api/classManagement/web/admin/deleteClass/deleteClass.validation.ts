import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteClassValidation = {
  params: TParams;
  body: never;
  query: never;
};

export const deleteClassValidation = {
  params,
};
