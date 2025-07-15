import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Post } from "./post.entity";

export type Comment = {
  post: ID;
  parentComment: ID | null;
  isReply: boolean;
  user: ID;
  userType: TEndUserEnum;
  content: string | null;
  attachments: IFile[];
  media: IFile[];
  publishedAt: Date;
} & BaseEntity;

export type CommentMetaData = GenerateMetaData<
  Comment,
  {
    post: Post;
    parentComment: Comment;
    user: BaseUser;
  }
>;
