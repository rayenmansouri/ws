import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const query = z.object({
  type: z.enum(["subjectType", "subSubjectType", "group"]),
  newId: validateNewId(),
  classNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type TGetFutureSessionOfTeacherValidation = {
  query: TQuery;
  params: TParams;
};

export const getFutureSessionOfTeacherValidation = {
  query,
  params,
};
