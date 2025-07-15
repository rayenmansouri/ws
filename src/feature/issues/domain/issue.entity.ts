import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { Admin } from "../../admins/domain/admin.entity";
import { StudentProfile } from "../../students/domain/studentProfile.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { FileDetails } from "./../../../core/fileManager/FileManager";
import { Interaction } from "./interaction.entity";
import { IssueReason } from "./issueReason.entity";

export const ISSUE_STATUS_ENUM = {
  RESOLVED: "resolved",
  UNRESOLVED: "unresolved",
} as const;
export type TIssuesStatusEnum = (typeof ISSUE_STATUS_ENUM)[keyof typeof ISSUE_STATUS_ENUM];

export type Issue = {
  author: ID;
  authorType: PickFromEnum<TEndUserEnum, "parent">;
  studentProfile: ID;
  content: { text: string; documents: FileDetails[]; media: FileDetails[] };
  adminParticipants: ID[];
  teacher: ID | null;
  isForwarded: boolean;
  lastInteractionDate: Date;
  reason: ID;
  lastInteraction: ID | null;
  targetType: PickFromEnum<TEndUserEnum, "admin" | "teacher">;
  status: TIssuesStatusEnum;
  sentAt: Date;
  participantViewStatuses: {
    participantType: PickFromEnum<TEndUserEnum, "parent" | "admin" | "teacher">;
    isSeen: boolean;
  }[];
} & BaseEntity;

export type IssueMetaData = GenerateMetaData<
  Issue,
  {
    author: BaseUser;
    adminParticipants: Admin[];
    studentProfile: StudentProfile;
    lastInteraction: Interaction;
    reason: IssueReason;
    teacher: Teacher;
  }
>;
