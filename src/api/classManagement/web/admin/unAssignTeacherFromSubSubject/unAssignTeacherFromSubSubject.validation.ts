import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const params = z.object({
  subSubjectTypeId: validateID(),
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnAssignTeacherFromSubSubjectValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const unAssignTeacherFromSubSubjectValidation = {
  params,
};
