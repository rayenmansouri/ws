import { ObjectId, Types } from "mongoose";
import { IFile } from "../../../feature/sessionManagement/domain/session.entity";
import {
  CATEGORIES_ENUM,
  TCategoriesEnum,
} from "../../../feature/announcements/domain/post.entity";
import { TReactionTypeEnum } from "../../../feature/announcements/domain/reaction.entity";
import { IEntity } from "../../../types/entities";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { createSchema } from "./../../../helpers/createSchema";
import { defaultReactions } from "./reaction.schema";
import { fileSchema } from "./comment.schema";

export interface ITaggedUser {
  userType: TEndUserWithoutMasterEnums;
  userId: ObjectId;
  taggedAt: Date;
}

export type TUserWithReaction = {
  userId: ObjectId;
  userFullName: string;
  userAvatar: string;
  reactionType: TReactionTypeEnum;
};

export type TAudience = {
  userTypes: TEndUserWithoutMasterEnums[];
};

export type IPost = {
  author: ObjectId;
  authorType: TEndUserWithoutMasterEnums;
  attachments: IFile[];
  media: IFile[];
  content: string;
  isCommentsAllowed: boolean;
  isPinned: boolean;
  pinnedAt: Date | null;
  audiences: TAudience[];
  reactions: Record<TReactionTypeEnum, number>;
  category: TCategoriesEnum;
  levels: ObjectId[] | null;
  classes: ObjectId[] | null;
  groups: ObjectId[] | null;
  hashTags: string[];
} & IEntity &
  ({ scheduledAt: Date; isScheduled: true } | { scheduledAt: null; isScheduled: false }) &
  ({ publishedAt: Date; isPublished: true } | { publishedAt: null; isPublished: false });

export const audienceSchema = { type: { type: String }, userTypes: { type: [String] } };

export const postSchema = createSchema<IPost>(
  {
    author: { type: Types.ObjectId, refPath: "authorType" },
    authorType: { type: String },
    category: { type: String, enum: CATEGORIES_ENUM },
    attachments: { type: [fileSchema], default: [] },
    media: { type: [fileSchema], default: [] },
    content: { type: String, default: null },
    isCommentsAllowed: { type: Boolean, default: false },
    scheduledAt: { type: Date, default: null },
    isScheduled: { type: Boolean, default: true },
    isPinned: { type: Boolean, default: false },
    pinnedAt: { type: Date, default: null },
    audiences: { type: [audienceSchema], default: [] },
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
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: true },
    levels: { type: [Types.ObjectId], default: null, ref: "level" },
    classes: { type: [Types.ObjectId], default: null, ref: "class" },
    groups: { type: [Types.ObjectId], default: null, ref: "group" },
    hashTags: { type: [String], default: [] },
  },
  { _id: true },
);
