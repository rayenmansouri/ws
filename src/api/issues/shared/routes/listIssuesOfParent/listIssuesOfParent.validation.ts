import { z } from "zod";
import { paginationOptionsValidation, validateID } from "../../../../../core/validator";
import { ISSUE_STATUS_ENUM } from "../../../../../feature/issues/domain/issue.entity";

const query = z
  .object({
    search: z.string().optional(),
    isSeen: z.boolean().optional(),
    issueReasonIds: z.array(validateID()).optional(),
    issueStatus: z.nativeEnum(ISSUE_STATUS_ENUM).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListIssuesOfParentValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listIssuesOfParentValidation = {
  query,
};
