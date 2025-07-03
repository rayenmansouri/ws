import { z } from "zod";
import { validateID, validateNewId } from "./../../../../../core/validator";

const body = z.object({
  teacherId: validateID(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  issueNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AssignTeacherToIssueValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const assignTeacherToIssueValidation = {
  body,
  params,
};
