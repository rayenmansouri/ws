import {
  INTERACTION_TYPE_ENUM,
  TIssueActionEnum,
} from "./../../../../feature/issues/dtos/interaction.dto";
import mongoose, { ObjectId } from "mongoose";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../../constants/globalEnums";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { IFile } from "../../../../feature/sessionManagement/domain/session.entity";
import { fileSchema } from "../../announcement/comment.schema";

export type TBaseInteraction = IEntity & { issue: ObjectId; sentAt: Date };

export type TReply = TBaseInteraction & {
  interactionType: typeof INTERACTION_TYPE_ENUM.REPLY;
  senderType:
    | typeof END_USER_ENUM.ADMIN
    | typeof END_USER_ENUM.TEACHER
    | typeof END_USER_ENUM.PARENT;
  sender: ObjectId;
  content: { text?: string; documents: IFile[] /*; images: IFile[]*/; media: IFile[] };
  actor: null;
  actorType: null;
  action: null;
  targetType: null;
  target: null;
};

export type TAction = TBaseInteraction & {
  interactionType: typeof INTERACTION_TYPE_ENUM.ACTION;
  actor: ObjectId;
  actorType: TEndAdministrationUserEnums;
  action: TIssueActionEnum;
  targetType:
    | typeof END_USER_ENUM.TEACHER
    | typeof END_USER_ENUM.PARENT
    | typeof END_USER_ENUM.ADMIN;
  target: ObjectId;
  senderType: null;
  sender: null;
  content: null;
};

export type IInteraction = TAction | TReply;

export const interactionSchema = createSchema<IInteraction>({
  issue: { type: mongoose.Schema.Types.ObjectId, ref: "issues" },
  sentAt: Date,
  interactionType: { type: String, default: null },
  actor: { type: mongoose.Schema.Types.ObjectId, refPath: "actorType", default: null },
  actorType: { type: String, default: null },
  action: { type: String, default: null },
  targetType: { type: String, default: null },
  target: { type: mongoose.Schema.Types.ObjectId, refPath: "targetType", default: null },
  senderType: { type: String, default: null },
  sender: { type: mongoose.Schema.ObjectId, refPath: "senderType", default: null },
  content: {
    type: { text: String, documents: [fileSchema], media: [fileSchema] },
    default: null,
  },
});
