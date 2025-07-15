import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export interface IIssueReason extends IEntity {
  name: string;
  color: string;
  iconUrl: string;
}

export const issueReasonSchema = createSchema<IIssueReason>({
  name: { type: String },
  color: { type: String },
  iconUrl: { type: String },
});
