import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Post } from "./post.entity";

export type UserPostFeed = {
  user: ID;
  userType: OmitFromEnum<TEndUserEnum, "master">;
  posts: ID[];
  unseenPosts: ID[];
} & BaseEntity;

export type UserPostFeedMetaData = GenerateMetaData<
  UserPostFeed,
  {
    user: BaseUser;
    posts: Post[];
    unseenPosts: Post[];
  }
>;
