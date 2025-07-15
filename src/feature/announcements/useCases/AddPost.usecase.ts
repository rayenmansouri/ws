import { injectable } from "inversify/lib/inversify";
import { Connection } from "mongoose";
import schedule from "node-schedule";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../../constants/ActionsResource";
import {
  END_USER_ENUM,
  TEndUserEnum,
  TEndUserWithoutMasterEnums,
} from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Populate } from "../../../core/populateTypes";
import { getAdminIdsByPermissions } from "../../../features/shared/services/getAuthorizedAdminIds.service";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import { TCategoriesEnum } from "../domain/post.entity";
import { PostAddedEvent } from "../event/postAdded.event";
import { FileUpload } from "../../../helpers/fileUpload";
import { batchUploadService } from "../../../helpers/upload";
import { File } from "../../../types/app-request";
import { ID } from "../../../types/BaseEntity";
import { School } from "../../schools/domain/school.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { PostMetaData } from "../domain/post.entity";
import { Reaction } from "../domain/reaction.entity";
import { PostDTO } from "../dtos/posts.dto";
import { PostMapper } from "../mappers/Post.mapper";
import { PostRepo } from "../repos/Post.repo";
import { ReactionRepo } from "../repos/Reaction.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { IsUserAllowedToViewAllPostsParams, PostService } from "../domain/Post.service";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";

export type AddPostRequest = {
  userTypes: TEndUserWithoutMasterEnums[];
  levelNewIds?: string[];
  classNewIds?: string[];
  groupNewIds?: string[];
  attachments: File[] | undefined;
  content?: string;
  category?: TCategoriesEnum;
  hashTags?: string[];
  isCommentsAllowed: boolean;
  scheduleAt?: Date;
  userDetails: IsUserAllowedToViewAllPostsParams;
};

@injectable()
export class AddPostUseCase {
  constructor(
    @inject("Connection") private connection: Connection,
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("School") private school: School,
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("ReactionRepo") private reactionRepo: ReactionRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {}

  async execute(dto: AddPostRequest): Promise<PostDTO> {
    const levels = dto.levelNewIds
      ? await this.levelRepo.findManyByNewIdsOrThrow(dto.levelNewIds, "notFound.level")
      : null;
    const classes = dto.classNewIds
      ? await this.classRepo.findManyByNewIdsOrThrow(dto.classNewIds, "notFound.class")
      : null;
    const groups = dto.groupNewIds
      ? await this.groupRepo.findManyByNewIdsOrThrow(dto.groupNewIds, "notFound.group")
      : null;

    const users = await this.usersRepo.listUsers(
      {
        userTypes: dto.userTypes,
        levels: levels ? levels.map(level => level._id) : undefined,
        classes: classes ? classes.map(classDoc => classDoc._id) : undefined,
        groupIds: groups ? groups.map(group => group._id) : undefined,
      },
      {
        skipPagination: true,
      },
    );
    const postUsers: { id: ID; type: TEndUserEnum }[] = users.docs.map(user => ({
      id: user._id,
      type: user.userType,
    }));

    const { attachmentsPayload, mediaPayload } = await this.uploadFile(dto.attachments);

    const postId = (
      await this.postRepo.addOne({
        author: dto.userDetails.user._id,
        authorType: dto.userDetails.userType,
        content: dto.content || null,
        isCommentsAllowed: dto.isCommentsAllowed,
        attachments: attachmentsPayload,
        isPublic: !levels && !classes && !groups,
        media: mediaPayload,
        category: dto.category || null,
        levels: levels ? levels.map(level => level._id) : null,
        classes: classes ? classes.map(classDoc => classDoc._id) : null,
        groups: groups ? groups.map(group => group._id) : null,
        hashTags: dto.hashTags || [],
        isPinned: false,
        pinnedAt: null,
        isPublished: dto.scheduleAt ? false : true,
        publishedAt: dto.scheduleAt ? null : getCurrentTimeOfSchool(this.school._id),
        isScheduled: !!dto.scheduleAt,
        scheduledAt: dto.scheduleAt || null,
        audiences: [],
        userTypes: dto.userTypes,
      })
    )._id;
    const addedPost = await this.postRepo.findOneByIdOrThrow(postId, "global.internalError", {
      populate: ["author", "levels", "classes", "groups"],
    });

    const addedReaction = await this.reactionRepo.addOne({
      post: postId,
      comment: null,
      users: [],
    });

    const userIds = postUsers.map(user => user.id);
    await this.userPostFeedRepo.addPostToFeeds(postId, userIds);

    if (!dto.scheduleAt) {
      void this.notifyAudience(postUsers, dto.userDetails.user._id, addedPost.newId);
      void this.sendNewPostEventToUsers(
        postUsers,
        addedPost,
        addedReaction,
        dto.userDetails.user._id,
      );
    } else {
      const dateInfo = {
        year: dto.scheduleAt.getFullYear(),
        month: dto.scheduleAt.getMonth(),
        day: dto.scheduleAt.getDate(),
        hour: dto.scheduleAt.getHours() - 1,
        minute: dto.scheduleAt.getMinutes(),
      };

      const publishRuleTime = this.createRecurrenceRule(dateInfo);

      schedule.scheduleJob(publishRuleTime, async () => {
        await this.postRepo.updateOneById(postId, {
          isPublished: true,
          publishedAt: dto.scheduleAt,
        });
        void this.notifyAudience(postUsers, dto.userDetails.user._id, addedPost.newId);
        void this.sendNewPostEventToUsers(
          postUsers,
          addedPost,
          addedReaction,
          dto.userDetails.user._id,
        );
      });
    }

    const isUserAllowedToViewAllPosts = PostService.isUserAllowedToViewAllPosts(dto.userDetails);

    return PostMapper.toPostDTO({
      post: addedPost,
      postReaction: addedReaction,
      comments: [],
      school: this.school,
      userId: dto.userDetails.user._id,
      includePublisher: isUserAllowedToViewAllPosts ? true : false,
    });
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

  private async notifyAudience(
    users: { id: ID; type: TEndUserEnum }[],
    authorId: ID,
    postNewId: string,
  ): Promise<void> {
    const promises: Promise<void>[] = [];
    users
      .filter(user => user.id !== authorId)
      .forEach(({ id, type }) => {
        promises.push(
          sendNotificationsToUsers(
            this.connection,
            [id],
            {
              userId: "",
              message: "",
              userType: type,
              status: NOTIFICATION_STATUS_ENUM.UNSEEN,
              date: getCurrentTimeOfSchool(this.school._id),
              dynamicFieldValues: {},
              topic: NOTIFICATION_TYPES_ENUM.NEW_POST_ADDED,
              details: {
                postNewId,
              },
            },
            {
              topic: NOTIFICATION_TYPES_ENUM.NEW_POST_ADDED,
              userType: type,
            },
          ),
        );
      });
    await Promise.all(promises);
  }

  private async sendNewPostEventToUsers(
    users: { id: ID; type: TEndUserEnum }[],
    post: Populate<PostMetaData, "author" | "levels" | "classes" | "groups">,
    postReaction: Reaction,
    authorId: ID,
  ): Promise<void> {
    const adminIds = await getAdminIdsByPermissions(
      this.connection,
      ACTION_ENUM.VIEW,
      RESOURCES_ENUM.ANNOUNCEMENT,
    );

    adminIds
      .filter(adminId => adminId !== authorId)
      .forEach(adminId => {
        const postDTOWithPublisher = PostMapper.toPostDTO({
          post,
          postReaction,
          comments: [],
          school: this.school,
          userId: adminId,
          includePublisher: true,
        });
        const event = new PostAddedEvent(this.school._id, postDTOWithPublisher);
        event.sendEventToUsers([{ id: adminId, type: END_USER_ENUM.ADMIN }]);
      });

    const usersWithoutAdmins = users.filter(user => !adminIds.includes(user.id));
    usersWithoutAdmins.forEach(({ id, type }) => {
      const postDTOWithoutPublisher = PostMapper.toPostDTO({
        post,
        postReaction,
        comments: [],
        school: this.school,
        userId: id,
      });
      const event = new PostAddedEvent(this.school._id, postDTOWithoutPublisher);
      event.sendEventToUsers([{ id, type }]);
    });
  }

  private createRecurrenceRule(dateInfo: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  }): schedule.RecurrenceRule {
    const rule = new schedule.RecurrenceRule();
    rule.year = dateInfo.year;
    rule.month = dateInfo.month;
    rule.date = dateInfo.day;
    rule.hour = dateInfo.hour;
    rule.minute = dateInfo.minute;
    return rule;
  }
}
