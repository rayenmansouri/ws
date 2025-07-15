import { ID } from "../../../types/BaseEntity";
import { UserPostFeed } from "./userPostFeed.entity";

export class UserFeedPostService {
  static isAllowedToSeePost(userPostFeed: UserPostFeed, postId: ID): boolean {
    return userPostFeed.posts.includes(postId);
  }
}
