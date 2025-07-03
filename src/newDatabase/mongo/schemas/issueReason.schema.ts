import { IssueReason } from "../../../feature/issues/domain/issueReason.entity";
import { createMongoSchema } from "../createSchema";

export const mongoIssueReasonSchema = createMongoSchema<IssueReason>({
  name: String,
  color: String,
  iconUrl: String,
});
