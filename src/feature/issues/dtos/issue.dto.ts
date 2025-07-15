import { TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TIssuesStatusEnum } from "../domain/issue.entity";
import { FileDTO } from "./../../../core/valueObjects/File.vo";
import { InteractionDTO } from "./interaction.dto";
import { IssueReasonDTO } from "./issueReason.dto";

export type IssueDTO = {
  _id: ID;
  newId: string;
  author: UserProfileDTO;
  content: {
    text: string;
    documents: FileDTO[];
    media: FileDTO[];
  };
  lastSender: UserProfileDTO;
  reason: IssueReasonDTO;
  teacher: UserProfileDTO | null;
  isForwarded: boolean;
  lastInteraction: InteractionDTO | null;
  targetType: PickFromEnum<TEndUserEnum, "teacher" | "admin">;
  status: TIssuesStatusEnum;
  sentAt: Date;
  isSeen: boolean;
  className: string | null;
  student: UserProfileDTO | null;
};
