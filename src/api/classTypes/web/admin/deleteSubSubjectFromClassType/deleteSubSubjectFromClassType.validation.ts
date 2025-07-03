import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
  subSubjectNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSubSubjectFromClassTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSubSubjectFromClassTypeValidation = {
  params,
};
