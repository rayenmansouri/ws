import { injectable } from "inversify";
import { Connection } from "mongoose";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { Users } from "../../../core/events/BaseEvent";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Populate } from "../../../core/populateTypes";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { PostReactionUpdatedEvent } from "../event/postReactionsUpdated.event";
import { School } from "../../schools/domain/school.entity";
import { PostMetaData } from "../domain/post.entity";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { ReactionService, ReactionSummary } from "../domain/Reactions.service";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { PostRepo } from "../repos/Post.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { getAdminIdsByPermissions } from "../../../features/shared/services/getAuthorizedAdminIds.service";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../constants/globalEnums";

export type ReactToPostRequest = {
  postNewId: string;
  reactionType: TReactionTypeEnum | null;
  userDetails: IsUserAllowedToViewAllPostsParams;
};

@injectable()
export class ReactToPostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
    @inject("Connection") private connection: Connection,
  ) {}

  async execute(dto: ReactToPostRequest): Promise<ReactionSummary> {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post", {
      populate: ["author"],
    });

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, post._id)) throw new ForbiddenError();
    }

    const postReaction = await this.reactionRepo.findReactionsOfOnePost(post._id);
    const hasUserReacted = postReaction.users.some(user => user.user === dto.userDetails.user._id);

    if (!dto.reactionType)
      await this.reactionRepo.removeReactionOfUser(postReaction._id, dto.userDetails.user._id);

    if (hasUserReacted && dto.reactionType)
      await this.reactionRepo.updateReactionOfUser(
        postReaction._id,
        dto.userDetails.user._id,
        dto.reactionType,
      );

    if (!hasUserReacted && dto.reactionType)
      await this.reactionRepo.addReactionOfUser(postReaction._id, {
        userId: dto.userDetails.user._id,
        userType: dto.userDetails.userType,
        reactionType: dto.reactionType,
        reactedAt: getCurrentTimeOfSchool(this.school._id),
      });

    const updatedReaction = await this.reactionRepo.findReactionsOfOnePost(post._id);
    const reactionSummary = ReactionService.getReactionSummary(updatedReaction);

    void this.sendEventToPostUsers(post, reactionSummary, dto.userDetails);

    if (dto.reactionType && post.author._id !== dto.userDetails.user._id)
      void this.notifyPostAuthor(post, dto.reactionType, dto.userDetails.user.fullName);

    return reactionSummary;
  }

  private async sendEventToPostUsers(
    post: Populate<PostMetaData, "author">,
    reactionSummary: ReactionSummary,
    userDetails: IsUserAllowedToViewAllPostsParams,
  ): Promise<void> {
    const adminIds = await getAdminIdsByPermissions(
      this.connection,
      ACTION_ENUM.VIEW,
      RESOURCES_ENUM.ANNOUNCEMENT,
    );

    const feeds = await this.userPostFeedRepo.findAllFeedsOfPost(post._id);

    const usersWithType: Users = feeds
      .map(feed => ({
        id: feed.user,
        type: feed.userType,
      }))
      .filter(user => user.id !== userDetails.user._id);

    adminIds.forEach(adminId => {
      if (adminId === userDetails.user._id) return;

      if (usersWithType.some(user => user.id === adminId)) return;

      usersWithType.push({ id: adminId.toString(), type: END_USER_ENUM.ADMIN });
    });

    const postReactionsUpdatedEvent = new PostReactionUpdatedEvent(this.school._id, {
      postId: post._id,
      postNewId: post.newId,
      reactionSummary,
      userNewId: userDetails.user.newId,
      userType: userDetails.userType,
      userReaction: undefined,
    });

    postReactionsUpdatedEvent.sendEventToUsers(usersWithType);
  }

  protected async notifyPostAuthor(
    post: Populate<PostMetaData, "author">,
    reactionType: TReactionTypeEnum,
    userFullName: string,
  ): Promise<void> {
    const notificationData = {
      userId: post.author._id,
      userType: post.authorType,
      message: "",
      status: NOTIFICATION_STATUS_ENUM.UNSEEN,
      date: getCurrentTimeOfSchool(this.school._id),
      dynamicFieldValues: {
        $reactionType: reactionType,
        $postNewId: post.newId,
        $userFullName: userFullName,
      },
      topic: NOTIFICATION_TYPES_ENUM.NEW_POST_REACTION,
      details: {
        postNewId: post.newId,
      },
    };

    await sendNotificationsToUsers(this.connection, [post.author._id], notificationData, {
      topic: NOTIFICATION_TYPES_ENUM.NEW_POST_REACTION,
      userType: post.authorType,
      ...notificationData.dynamicFieldValues,
    });
  }
}
