import { TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Comment } from "./comment.entity";
import { Post } from "./post.entity";

export type Reaction = {
  users: {
    user: ID;
    userType: TEndUserWithoutMasterEnums;
    reactionType: TReactionTypeEnum;
    reactedAt: Date;
  }[];
  comment: ID | null;
  post: ID | null;
} & BaseEntity;

export type ReactionMetaData = GenerateMetaData<
  Reaction,
  {
    comment: Comment;
    post: Post;
    "users.user": BaseUser;
  }
>;
export const REACTION_TYPE_ENUM = {
  LIKE: "like",
  care: "care",
  LOVE: "love",
  LAUGH: "laugh",
  ANGRY: "angry",
  SAD: "sad",
  SURPRISED: "surprised",
} as const;

export type TReactionTypeEnum = (typeof REACTION_TYPE_ENUM)[keyof typeof REACTION_TYPE_ENUM];
