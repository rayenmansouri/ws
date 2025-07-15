import { TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TCategoriesEnum } from "../domain/post.entity";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { ReactionSummary } from "../domain/Reactions.service";
import { CommentDTO } from "./comment.dto";

export const POST_POLICY_ENUM = {
  ALL: "all",
  CUSTOM: "custom",
} as const;
export type TPostPolicyEnum = (typeof POST_POLICY_ENUM)[keyof typeof POST_POLICY_ENUM];

export type PostDTO = {
  _id: ID;
  newId: string;
  publisher: UserProfileDTO | null;
  publishedAt: Date;
  content: string | null;
  userTypes: TEndUserWithoutMasterEnums[];
  audience: string;
  isPublic: boolean;
  schoolName: string;
  schoolLogo: string | null;
  attachments: IFile[];
  media: IFile[];
  reactionSummary: ReactionSummary;
  userReaction: TReactionTypeEnum | null;
  category: TCategoriesEnum | null;
  comments: CommentDTO[];
  commentsCount: number;
  isCommentsAllowed: boolean;
  isPinned: boolean;
  pinnedAt: Date | null;
  policy: TPostPolicyEnum;
  levels: EntityDto[] | null;
  classes: EntityDto[] | null;
  groups: EntityDto[] | null;
  hashTags: string[];
};
