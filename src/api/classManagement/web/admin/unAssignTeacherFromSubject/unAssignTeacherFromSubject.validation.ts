import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  subjectTypeId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UnAssignTeacherFromSubjectValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const unAssignTeacherFromSubjectValidation = {
  params,
};
