import mongoose, { ObjectId } from "mongoose";
import {
  END_USER_ENUM,
  TEndAdministrationUserEnums,
  TEndUserEnum,
} from "../../../../constants/globalEnums";
import { TIssuesStatusEnum } from "../../../../feature/issues/domain/issue.entity";
import { IFile } from "../../../../feature/sessionManagement/domain/session.entity";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { PickFromEnum } from "../../../../types/utils/enums.util";
import { fileSchema } from "../../announcement/comment.schema";

export interface IIssue extends IEntity {
  author: ObjectId;
  authorType: PickFromEnum<TEndUserEnum, "parent">;
  studentProfile: ObjectId;
  content: { text: string; documents: IFile[]; /*images: IFile[];*/ media: IFile[] };
  adminParticipants: ObjectId[];
  teacher: ObjectId | null;
  isForwarded: boolean;
  lastInteractionDate: Date;
  reason: ObjectId;
  lastInteraction: ObjectId | null;
  targetType: TEndAdministrationUserEnums;
  status: TIssuesStatusEnum;
  sentAt: Date;
  participantViewStatuses: {
    participantType: PickFromEnum<TEndUserEnum, "parent" | "admin" | "teacher">;
    isSeen: boolean;
  }[];
}

export const issuesSchema = createSchema<IIssue>({
  author: { type: mongoose.Schema.Types.ObjectId, refPath: "authorType" },
  authorType: { type: String, default: END_USER_ENUM.PARENT },
  studentProfile: { type: mongoose.Schema.Types.ObjectId, ref: "studentProfile" },
  content: { text: String, documents: [fileSchema], images: [fileSchema], media: [fileSchema] },
  reason: { type: mongoose.Schema.Types.ObjectId, ref: "issueReason" },
  adminParticipants: { type: [mongoose.Schema.Types.ObjectId], ref: "admin", default: [] },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "teacher", default: null },
  isForwarded: { type: Boolean, default: false },
  lastInteractionDate: Date,
  lastInteraction: { type: mongoose.Schema.Types.ObjectId, ref: "interaction", default: null },
  targetType: { type: String },
  status: { type: String },
  sentAt: Date,
  participantViewStatuses: {
    type: [{ participantType: { type: String }, isSeen: Boolean }],
    default: [],
  },
});
