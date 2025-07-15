import { injectable } from "inversify";
import { Connection } from "mongoose";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { Users } from "../../../core/events/BaseEvent";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Populate } from "../../../core/populateTypes";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { ReactOnCommentAddedEvent } from "../event/newReactOnCommentAdded.event";
import { School } from "../../schools/domain/school.entity";
import { CommentMetaData } from "../domain/comment.entity";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { ReactionService, ReactionSummary } from "../domain/Reactions.service";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { CommentRepo } from "../repos/Comment.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { inject } from "../../../core/container/TypedContainer";
import { getAdminIdsByPermissions } from "../../../features/shared/services/getAuthorizedAdminIds.service";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../constants/globalEnums";

export type ReactToCommentRequest = {
  commentNewId: string;
  reactionType: TReactionTypeEnum | null;
  userDetails: IsUserAllowedToViewAllPostsParams;
};

@injectable()
export class ReactToCommentUseCase {
  constructor(
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
    @inject("Connection") private connection: Connection,
  ) {}

  async execute(dto: ReactToCommentRequest): Promise<ReactionSummary> {
    const comment = await this.commentRepo.findOneByNewIdOrThrow(
      dto.commentNewId,
      "notFound.comment",
      {
        populate: ["post", "parentComment"],
      },
    );

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, comment.post._id))
        throw new ForbiddenError();
    }

    const commentReaction = await this.reactionRepo.findReactionsOfOneComment(comment._id);
    const hasUserReacted = commentReaction.users.some(
      user => user.user === dto.userDetails.user._id,
    );

    if (!dto.reactionType)
      await this.reactionRepo.removeReactionOfUser(commentReaction._id, dto.userDetails.user._id);

    if (hasUserReacted && dto.reactionType)
      await this.reactionRepo.updateReactionOfUser(
        commentReaction._id,
        dto.userDetails.user._id,
        dto.reactionType,
      );

    if (!hasUserReacted && dto.reactionType)
      await this.reactionRepo.addReactionOfUser(commentReaction._id, {
        userId: dto.userDetails.user._id,
        userType: dto.userDetails.userType,
        reactionType: dto.reactionType,
        reactedAt: getCurrentTimeOfSchool(this.school._id),
      });

    const updatedReaction = await this.reactionRepo.findReactionsOfOneComment(comment._id);
    const reactionSummary = ReactionService.getReactionSummary(updatedReaction);

    void this.sendEventToPostUsers(comment, reactionSummary, dto.userDetails);

    if (dto.reactionType && comment.user !== dto.userDetails.user._id)
      void this.notifyCommentAuthor(comment, dto.reactionType, dto.userDetails.user.fullName);

    return reactionSummary;
  }

  private async sendEventToPostUsers(
    comment: Populate<CommentMetaData, "post" | "parentComment">,
    reactionSummary: ReactionSummary,
    userDetails: IsUserAllowedToViewAllPostsParams,
  ): Promise<void> {
    const adminIds = await getAdminIdsByPermissions(
      this.connection,
      ACTION_ENUM.VIEW,
      RESOURCES_ENUM.ANNOUNCEMENT,
    );

    const feeds = await this.userPostFeedRepo.findAllFeedsOfPost(comment.post._id);

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

    const postReactionsUpdatedEvent = new ReactOnCommentAddedEvent(this.school._id, {
      postId: comment.post._id,
      postNewId: comment.post.newId,
      userNewId: userDetails.user.newId,
      userType: userDetails.userType,
      commentId: comment._id,
      commentNewId: comment.newId,
      parentCommentId: comment.parentComment?._id ?? null,
      parentCommentNewId: comment.parentComment?.newId ?? null,
      reacts: reactionSummary,
      userReaction: null,
    });

    postReactionsUpdatedEvent.sendEventToUsers(usersWithType);
  }

  protected async notifyCommentAuthor(
    comment: Populate<CommentMetaData, "parentComment" | "post">,
    reactionType: TReactionTypeEnum,
    userFullName: string,
  ): Promise<void> {
    const notificationData = {
      userId: comment.user,
      userType: comment.userType,
      message: "",
      status: NOTIFICATION_STATUS_ENUM.UNSEEN,
      date: getCurrentTimeOfSchool(this.school._id),
      dynamicFieldValues: {
        $reactionType: reactionType,
        $postNewId: comment.post.newId,
        $userFullName: userFullName,
      },
      topic: NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REACTION,
      details: {
        postNewId: comment.post.newId,
        commentNewId: comment.newId,
      },
    };

    await sendNotificationsToUsers(this.connection, [comment.user], notificationData, {
      topic: NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REACTION,
      userType: comment.userType,
      ...notificationData.dynamicFieldValues,
    });
  }
}
