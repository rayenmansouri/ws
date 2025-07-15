import { injectable } from "inversify";
import { File } from "../../../types/app-request";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { PostRepo } from "../repos/Post.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { UserFeedPostService } from "../domain/UserPostFeed.service";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { FileUpload } from "../../../helpers/fileUpload";
import { School } from "../../schools/domain/school.entity";
import { batchUploadService } from "../../../helpers/upload";
import { CommentRepo } from "../repos/Comment.repo";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { ReactionRepo } from "../repos/Reaction.repo";
import {
  CommentOnPostAddedEvent,
  TNewCommentOnPostAddedPayload,
} from "../event/newCommentOnPostAdded.event";
import { ID } from "../../../types/BaseEntity";
import { GetOneCommentUseCase } from "./GetOneComment.usecase";
import { Users } from "../../../core/events/BaseEvent";
import { CommentDTO } from "../dtos/comment.dto";
import { Post } from "../domain/post.entity";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import { Connection } from "mongoose";
import { UsersRepo } from "../../users/domain/user.repo";
import { IBaseNotification } from "../../notifications/notification.entity";
import { getAdminIdsByPermissions } from "../../../features/shared/services/getAuthorizedAdminIds.service";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";

export type AddCommentToPostRequest = {
  postNewId: string;
  content?: string;
  attachments?: File[];
  userDetails: IsUserAllowedToViewAllPostsParams;
  mentions?: {
    type: TEndUserEnum;
    newId: string;
  }[];
};

@injectable()
export class AddCommentToPostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
    @inject("CommentRepo") private commentRepo: CommentRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("GetOneCommentUseCase") private getOneCommentUseCase: GetOneCommentUseCase,
    @inject("Connection") private connection: Connection,
    @inject("UsersRepo") private usersRepo: UsersRepo,
  ) {}

  async execute(dto: AddCommentToPostRequest): Promise<CommentDTO> {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post");

    if (!post.isCommentsAllowed) throw new BadRequestError("Post.commentsNotAllowed");

    if (!PostService.isUserAllowedToViewAllPosts(dto.userDetails)) {
      const userFeed = await this.userPostFeedRepo.findPostFeedOfUser(dto.userDetails.user._id);

      if (!UserFeedPostService.isAllowedToSeePost(userFeed, post._id))
        throw new BadRequestError("Post.commentsNotAllowed");
    }

    const { attachmentsPayload, mediaPayload } = await this.uploadFile(dto.attachments);

    const addedComment = await this.commentRepo.addOne({
      post: post._id,
      content: dto.content || null,
      attachments: attachmentsPayload,
      media: mediaPayload,
      isReply: false,
      parentComment: null,
      publishedAt: getCurrentTimeOfSchool(this.school._id),
      user: dto.userDetails.user._id,
      userType: dto.userDetails.userType,
    });

    await this.reactionRepo.addOne({
      comment: addedComment._id,
      post: null,
      users: [],
    });

    const commentDTO = await this.getOneCommentUseCase.execute(addedComment.newId, dto.userDetails);

    void this.sendNewCommentOnPostToAudiences(
      { postId: post._id, comment: commentDTO },
      post._id,
      dto.userDetails.user._id,
    );

    if (dto.userDetails.user._id !== post.author)
      void this.notifyPostAuthor(post, addedComment.newId, dto.userDetails.user.fullName);

    void this.notifyUserMentions(
      dto.mentions,
      post.newId,
      addedComment.newId,
      dto.userDetails.user.fullName,
    );

    return commentDTO;
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

  private async sendNewCommentOnPostToAudiences(
    payload: TNewCommentOnPostAddedPayload,
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

    const postReactionsUpdatedEvent = new CommentOnPostAddedEvent(this.school._id, payload);
    postReactionsUpdatedEvent.sendEventToUsers(usersWithType);
  }

  private async notifyPostAuthor(
    post: Post,
    commentNewId: string,
    userFullName: string,
  ): Promise<void> {
    const notificationData = {
      userId: post.author,
      userType: post.authorType,
      message: "",
      status: NOTIFICATION_STATUS_ENUM.UNSEEN,
      date: getCurrentTimeOfSchool(this.school._id),
      dynamicFieldValues: {
        $postNewId: post.newId,
        $commentNewId: commentNewId,
        $userFullName: userFullName,
      },
      topic: NOTIFICATION_TYPES_ENUM.NEW_COMMENT_ON_POST,
      details: {
        postNewId: post.newId,
        commentNewId,
      },
    };

    await sendNotificationsToUsers(this.connection, [post.author], notificationData, {
      topic: NOTIFICATION_TYPES_ENUM.NEW_POST_REACTION,
      userType: post.authorType,
      ...notificationData.dynamicFieldValues,
    });
  }

  private async notifyUserMentions(
    mentions: AddCommentToPostRequest["mentions"],
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
