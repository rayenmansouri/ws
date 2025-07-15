import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  subjectTypeId: validateID(),
  teacherId: validateID(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AssignTeacherToSubjectInClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const assignTeacherToSubjectInClassValidation = {
  body,
  params,
};
