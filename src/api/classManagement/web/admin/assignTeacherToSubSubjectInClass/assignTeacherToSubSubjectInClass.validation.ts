import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  teacherId: validateID(),
  subSubjectTypeId: validateID(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AssignTeacherToSubSubjectInClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const assignTeacherToSubSubjectInClassValidation = {
  body,
  params,
};
