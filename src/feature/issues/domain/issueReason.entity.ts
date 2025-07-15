import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type IssueReason = {
  name: string;
  color: string;
  iconUrl: string;
} & BaseEntity;

export type IssueReasonMetaData = GenerateMetaData<IssueReason, never>;
