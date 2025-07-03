import { ObjectId, Types } from "mongoose";
import { TReactionTypeEnum } from "../../../features/schoolAnnouncement/constants/reactionType.constant";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { createSchema } from "./../../../helpers/createSchema";
import { defaultReactions } from "./reaction.schema";
import { IEntity } from "../../../types/entities";
import { IFile } from "../../../feature/sessionManagement/domain/session.entity";

export const fileSchema = {
  url: String,
  public_id: String,
  name: String,
  date: Date,
  size: Number,
  mimeType: String,
};

export interface IComment extends IEntity {
  post: ObjectId;
  parentComment: ObjectId | null;
  isReply: boolean;
  user: ObjectId;
  publishedAt: Date;
  userType: TEndUserWithoutMasterEnums;
  content: string | null;
  attachments: IFile[];
  media: IFile[];
  reactions: Record<TReactionTypeEnum, number>;
}

export const commentSchema = createSchema<IComment>({
  post: { type: Types.ObjectId, ref: "post" },
  parentComment: { type: Types.ObjectId, ref: "comment" },
  isReply: { type: Boolean, default: false },
  user: { type: Types.ObjectId, refPath: "userType" },
  userType: String,
  publishedAt: { type: Date },
  content: { type: String, default: null },
  attachments: { type: [fileSchema], default: [] },
  media: { type: [fileSchema], default: [] },
  reactions: {
    type: {
      like: Number,
      care: Number,
      love: Number,
      laugh: Number,
      angry: Number,
      sad: Number,
      surprised: Number,
    },
    default: defaultReactions,
    _id: false,
  },
});
