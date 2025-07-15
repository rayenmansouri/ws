import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  examTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteExamTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteExamTypeValidation = {
  params,
};
