import { validateNewId } from "./../../../../../core/validator";
import { ISSUE_STATUS_ENUM } from "./../../../../../feature/issues/domain/issue.entity";
import { z } from "zod";

const body = z.object({
  status: z.nativeEnum(ISSUE_STATUS_ENUM),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  issueNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateIssueStatusValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateIssueStatusValidation = {
  body,
  params,
};
