import { FileDTO } from "./../../../core/valueObjects/File.vo";
import { ID } from "../../../types/BaseEntity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export const ISSUE_ACTION_ENUM = {
  ADD: "add",
  REMOVE: "remove",
} as const;
export type TIssueActionEnum = (typeof ISSUE_ACTION_ENUM)[keyof typeof ISSUE_ACTION_ENUM];

export const INTERACTION_TYPE_ENUM = {
  ACTION: "action",
  REPLY: "reply",
} as const;

export type TInteractionTypeEnum =
  (typeof INTERACTION_TYPE_ENUM)[keyof typeof INTERACTION_TYPE_ENUM];

export type InteractionDTO = {
  _id: ID;
  newId: string;
  type: TInteractionTypeEnum;
  action: TIssueActionEnum | null;
  actor: UserProfileDTO | null;
  target: UserProfileDTO | null;
  content: {
    text?: string;
    documents: FileDTO[];
    media: FileDTO[];
  } | null;
  sender: UserProfileDTO | null;
  sentAt: Date;
};
