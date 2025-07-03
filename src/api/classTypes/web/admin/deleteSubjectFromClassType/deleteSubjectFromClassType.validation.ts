import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
  subjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSubjectFromClassTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSubjectFromClassTypeValidation = {
  params,
};
