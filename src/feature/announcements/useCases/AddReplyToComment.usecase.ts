import { injectable } from "inversify";
import { Connection } from "mongoose";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { Users } from "../../../core/events/BaseEvent";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import {
  ReplyOnCommentAddedEvent,
  TReplyOnCommentAddedPayload,
} from "../event/newReplyOnCommentAdded.event";
import { FileUpload } from "../../../helpers/fileUpload";
import { batchUploadService } from "../../../helpers/upload";
import { File } from "../../../types/app-request";
import { ID } from "../../../types/BaseEntity";
import { IBaseNotification } from "../../notifications/notification.entity";
import { School } from "../../schools/domain/school.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { Comment } from "../domain/comment.entity";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { ReplyDTO } from "../dtos/reply.dto";
import { ReplyMapper } from "../mappers/Reply.mapper";
import { CommentRepo } from "../repos/Comment.repo";
import { PostRepo } from "../repos/Post.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { getAdminIdsByPermissions } from "../../../features/shared/services/getAuthorizedAdminIds.service";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";

export type AddReplyToCommentRequest = {
  parentCommentNewId: string;
  content?: string;
  attachments?: File[];
  userDetails: IsUserAllowedToViewAllPostsParams;
  mentions?: {
    type: TEndUserEnum;
    newId: string;
  }[];
};

@injectable()
export class AddReplyToCommentUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("Connection") private connection: Connection,
    @inject("UsersRepo") private usersRepo: UsersRepo,
  ) {}

  async execute(dto: AddReplyToCommentRequest): Promise<ReplyDTO> {
    const parentComment = await this.commentRepo.findOneByNewIdOrThrow(
      dto.parentCommentNewId,
      "notFound.comment",
    );

    const post = await this.postRepo.findOneByIdOrThrow(parentComment.post, "notFound.post");

    if (!post.isCommentsAllowed) throw new BadRequestError("Post.commentsNotAllowed");

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, post._id))
        throw new BadRequestError("Post.commentsNotAllowed");
    }

    const { attachmentsPayload, mediaPayload } = await this.uploadFile(dto.attachments);

    const addedReply = await this.commentRepo.addOne({
      post: post._id,
      content: dto.content || null,
      attachments: attachmentsPayload,
      media: mediaPayload,
      isReply: true,
      parentComment: parentComment._id,
      publishedAt: getCurrentTimeOfSchool(this.school._id),
      user: dto.userDetails.user._id,
      userType: dto.userDetails.userType,
    });

    await this.reactionRepo.addOne({
      comment: addedReply._id,
      post: null,
      users: [],
    });

    const reply = await this.commentRepo.findOneByIdOrThrow(
      addedReply._id,
      "global.internalError",
      { populate: ["user"] },
    );
    const replyDTO = ReplyMapper.toReplyDTO({
      parentCommentNewId: dto.parentCommentNewId,
      reply,
      replyReaction: { users: [] },
      userId: dto.userDetails.user._id,
      userType: dto.userDetails.userType,
    });

    void this.sendNewReplyOnCommentToAudiences(replyDTO, post._id, dto.userDetails.user._id);

    if (dto.userDetails.user._id !== parentComment.user)
      void this.notifyCommentAuthor(parentComment, post.newId, dto.userDetails.user.fullName);

    void this.notifyUserMentions(
      dto.mentions,
      post.newId,
      addedReply.newId,
      dto.userDetails.user.fullName,
    );

    return replyDTO;
  }

  private async uploadFile(
    attachments: File[] | undefined,
  ): Promise<{ attachmentsPayload: IFile[]; mediaPayload: IFile[] }> {
    if (!attachments || !attachments.length) return { attachmentsPayload: [], mediaPayload: [] };

    const files = attachments;

    const mediaFiles = FileUpload.getMediaFiles(files);
    const attachmentsFile = FileUpload.removeMediaFiles(files);
    const mediaPayload = await this.handelUploadFile(mediaFiles);
    const attachmentsPayload = await this.handelUploadFile(attachmentsFile);

    return { attachmentsPayload, mediaPayload };
  }

  private async handelUploadFile(files: File[]): Promise<IFile[]> {
    if (!files.length) return [];

    const mediaFilePath = FileUpload.generateFilePaths(files, this.school._id, "post");

    const mediaBuffers = files.map(mediaFile => mediaFile.buffer);
    const uploadedMediaFiles = await batchUploadService(mediaBuffers, mediaFilePath);

    const formatFiles = FileUpload.formatUploadedFile(files, uploadedMediaFiles, this.school._id);

    return formatFiles;
  }

  private async sendNewReplyOnCommentToAudiences(
    payload: TReplyOnCommentAddedPayload,
    postId: ID,
    userId: ID,
  ): Promise<void> {
    const adminIds = await getAdminIdsByPermissions(
      this.connection,
      ACTION_ENUM.VIEW,
      RESOURCES_ENUM.ANNOUNCEMENT,
    );

    const feeds = await this.userPostFeedRepo.findAllFeedsOfPost(postId);

    const usersWithType: Users = feeds
      .map(feed => ({
        id: feed.user,
        type: feed.userType,
      }))
      .filter(user => user.id !== userId);

    adminIds.forEach(adminId => {
      if (adminId === userId) return;

      if (usersWithType.some(user => user.id === adminId)) return;

      usersWithType.push({ id: adminId.toString(), type: END_USER_ENUM.ADMIN });
    });

    const postReactionsUpdatedEvent = new ReplyOnCommentAddedEvent(this.school._id, payload);
    postReactionsUpdatedEvent.sendEventToUsers(usersWithType);
  }

  private async notifyCommentAuthor(
    comment: Comment,
    postNewId: string,
    userFullName: string,
  ): Promise<void> {
    const notificationData = {
      userId: comment.user,
      userType: comment.userType,
      message: "",
      status: NOTIFICATION_STATUS_ENUM.UNSEEN,
      date: getCurrentTimeOfSchool(this.school._id),
      dynamicFieldValues: {
        $commentNewId: comment.newId,
        $postNewId: postNewId,
        $userFullName: userFullName,
      },
      topic: NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REPLY,
      details: {
        postNewId,
        commentNewId: comment.newId,
      },
    };

    await sendNotificationsToUsers(this.connection, [comment.user], notificationData, {
      topic: NOTIFICATION_TYPES_ENUM.NEW_COMMENT_REPLY,
      userType: comment.userType,
      ...notificationData.dynamicFieldValues,
    });
  }

  private async notifyUserMentions(
    mentions: AddReplyToCommentRequest["mentions"],
    postNewId: string,
    commentNewId: string,
    userFullName: string,
  ): Promise<void> {
    if (!mentions || mentions.length == 0) return;

    const users = await this.usersRepo.findManyByNewIdOrThrow(mentions);

    const promises: Promise<void>[] = [];
    users.forEach(user => {
      const notificationPayload: IBaseNotification = {
        userId: user._id,
        userType: user.type,
        message: "",
        status: NOTIFICATION_STATUS_ENUM.UNSEEN,
        date: getCurrentTimeOfSchool(this.school._id),
        dynamicFieldValues: {
          $userFullName: userFullName,
        },
        topic: NOTIFICATION_TYPES_ENUM.MENTION_IN_COMMENT,
        details: {
          postNewId,
          commentNewId,
        },
      };

      promises.push(
        sendNotificationsToUsers(this.connection, [user._id], notificationPayload, {
          topic: NOTIFICATION_TYPES_ENUM.MENTION_IN_COMMENT,
          userType: user.type,
          ...notificationPayload.dynamicFieldValues,
        }),
      );
    });

    await Promise.all(promises);
  }
}
