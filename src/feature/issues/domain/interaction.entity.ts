import { TInteractionTypeEnum, TIssueActionEnum } from "./../dtos/interaction.dto";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { FileDetails } from "./../../../core/fileManager/FileManager";
import { Issue } from "./issue.entity";

export type Interaction = {
  interactionType: TInteractionTypeEnum;
  issue: ID;
  sentAt: Date;
  senderType: PickFromEnum<TEndUserEnum, "parent" | "admin" | "teacher"> | null;
  sender: ID | null; //message
  content: { text?: string; documents: FileDetails[]; media: FileDetails[] } | null;
  actor: ID | null; //action
  actorType: PickFromEnum<TEndUserEnum, "admin" | "teacher"> | null;
  action: TIssueActionEnum | null;
  targetType: PickFromEnum<TEndUserEnum, "parent" | "admin" | "teacher"> | null;
  target: ID | null; //action
} & BaseEntity;

export type InteractionMetaData = GenerateMetaData<
  Interaction,
  {
    issue: Issue;
    actor: BaseUser;
    sender: BaseUser;
    target: BaseUser;
  }
>;
