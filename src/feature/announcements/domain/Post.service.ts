import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { AuthorizationService } from "../../authorization/domain/Authorization.service";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Post } from "./post.entity";

export type IsUserAllowedToViewAllPostsParams = {
  user: Omit<BaseUser, "roles"> & { roles: Role[] };
  userType: TEndUserEnum;
};

export class PostService {
  static isUserAllowedToViewAllPosts({
    user,
    userType,
  }: IsUserAllowedToViewAllPostsParams): boolean {
    if (userType !== END_USER_ENUM.ADMIN) return false;

    if (AuthorizationService.isActionAllowed(user, ACTION_ENUM.VIEW, RESOURCES_ENUM.ANNOUNCEMENT))
      return true;

    return false;
  }

  static getAudience(post: Pick<Post, "userTypes">): string {
    if (post.userTypes.length === 4) return "PUBLIC";

    if (post.userTypes.length === 1) return post.userTypes[0].toUpperCase();

    return "CUSTOM";
  }
}
