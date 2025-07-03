import { ObjectId, Types } from "mongoose";
import { TEndUserWithoutMasterEnums } from "./../../../constants/globalEnums";
import { createSchema } from "./../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import {
  TReactionTypeEnum,
  REACTION_TYPE_ENUM,
} from "../../../features/schoolAnnouncement/constants/reactionType.constant";

export const defaultReactions: Record<TReactionTypeEnum, 0> = {
  like: 0,
  care: 0,
  love: 0,
  laugh: 0,
  angry: 0,
  sad: 0,
  surprised: 0,
};

export type IReaction = {
  users: {
    user: ObjectId;
    reactionType: TReactionTypeEnum;
    userType: TEndUserWithoutMasterEnums;
    reactedAt: Date;
  }[];
} & ({ comment: ObjectId; post: null } | { comment: null; post: ObjectId }) &
  IEntity;

export const reactionSchema = createSchema<IReaction>({
  users: [
    {
      user: { type: Types.ObjectId, refPath: "users.userType" },
      reactionType: { type: String, enum: REACTION_TYPE_ENUM },
      userType: { type: String },
    },
  ],
  comment: { type: Types.ObjectId, ref: "comment", default: null },
  post: { type: Types.ObjectId, ref: "post", default: null },
});
