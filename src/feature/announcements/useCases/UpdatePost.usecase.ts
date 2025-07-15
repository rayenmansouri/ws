import { injectable } from "inversify";
import {
  END_USER_ENUM,
  TEndUserEnum,
  TEndUserWithoutMasterEnums,
} from "../../../constants/globalEnums";
import { TCategoriesEnum } from "../domain/post.entity";
import { IsUserAllowedToViewAllPostsParams } from "../domain/Post.service";
import { PostRepo } from "../repos/Post.repo";
import { inject } from "../../../core/container/TypedContainer";
import { UsersRepo } from "../../users/domain/user.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { UserPostFeedRepo } from "../repos/UserPostFeed.repo";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { File } from "../../../types/app-request";
import { IFile } from "../../sessionManagement/domain/session.entity";
import { Post } from "../domain/post.entity";
import { FileUpload } from "../../../helpers/fileUpload";
import { handelEditFile } from "../../../core/handelEditFile";
import { School } from "../../schools/domain/school.entity";
import { ID } from "../../../types/BaseEntity";
import { sendNotificationsToUsers } from "../../../features/notification/services/helpers.service";
import {
  NOTIFICATION_STATUS_ENUM,
  NOTIFICATION_TYPES_ENUM,
} from "../../../features/notification/constants/constants";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { Connection } from "mongoose";

export type UpdatePostRequest = {
  postNewId: string;
  userDetails: IsUserAllowedToViewAllPostsParams;
  userTypes?: TEndUserWithoutMasterEnums[];
  levelNewIds?: string[];
  classNewIds?: string[];
  groupNewIds?: string[];
  attachments?: File[];
  deleteAttachments?: string[];
  content?: string;
  category?: TCategoriesEnum;
  hashTags?: string[];
  isCommentsAllowed?: boolean;
};

@injectable()
export class UpdatePostUseCase {
  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("UserPostFeedRepo") private feedRepo: UserPostFeedRepo,
    @inject("School") private school: School,
    @inject("Connection") private connection: Connection,
  ) {}

  async execute(dto: UpdatePostRequest): Promise<void> {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post");

    if (dto.userDetails.userType !== END_USER_ENUM.ADMIN)
      if (dto.userDetails.user._id !== post.author) throw new ForbiddenError();

    const oldPostUsers = await this.usersRepo.listUsers(
      {
        userTypes: post.userTypes,
        classes: post.classes || undefined,
        levels: post.levels || undefined,
        groupIds: post.groups || undefined,
      },
      {
        skipPagination: true,
      },
    );

    const newLevelIds = dto.levelNewIds
      ? (await this.levelRepo.findManyByNewIdsOrThrow(dto.levelNewIds, "notFound.level")).map(
          level => level._id,
        )
      : null;

    const newClassIds = dto.classNewIds
      ? (await this.classRepo.findManyByNewIdsOrThrow(dto.classNewIds, "notFound.class")).map(
          classDoc => classDoc._id,
        )
      : null;

    const newGroupIds = dto.groupNewIds
      ? (await this.groupRepo.findManyByNewIdsOrThrow(dto.groupNewIds, "notFound.group")).map(
          group => group._id,
        )
      : null;

    const newPostUsers = await this.usersRepo.listUsers(
      {
        userTypes: dto.userTypes || post.userTypes,
        levels: newLevelIds || undefined,
        classes: newClassIds || undefined,
        groupIds: newGroupIds || undefined,
      },
      {
        skipPagination: true,
      },
    );

    const addedUsers = newPostUsers.docs.filter(
      user => !oldPostUsers.docs.some(oldUser => oldUser._id === user._id),
    );

    const removedUsers = oldPostUsers.docs.filter(
      user => !newPostUsers.docs.some(newUser => newUser._id === user._id),
    );

    await this.feedRepo.removePostFromFeeds(
      post._id,
      removedUsers.map(user => user._id),
    );
    await this.feedRepo.addPostToFeeds(
      post._id,
      addedUsers.map(user => user._id),
    );

    const { attachmentsPayload, mediaPayload } = await this.uploadFile(
      dto.attachments,
      dto.deleteAttachments,
      post,
    );

    await this.postRepo.updateOneById(post._id, {
      attachments: attachmentsPayload,
      media: mediaPayload,
      userTypes: dto.userTypes || post.userTypes,
      levels: newLevelIds,
      classes: newClassIds,
      groups: newGroupIds,
      content: dto.content,
      category: dto.category,
      hashTags: dto.hashTags,
      isCommentsAllowed: dto.isCommentsAllowed,
      isPublic: !newLevelIds && !newClassIds && !newGroupIds,
    });

    void this.sendNotificationToUser(
      addedUsers.map(user => ({ id: user._id, type: user.userType })),
      post.newId,
    );
  }

  private async uploadFile(
    newAttachments: File[] | undefined,
    deletedAttachments: string[] | undefined,
    post: Post,
  ): Promise<{ attachmentsPayload: IFile[]; mediaPayload: IFile[] }> {
    const files = newAttachments;
    const deletedMedia =
      deletedAttachments?.filter(file => post.media.find(media => media.public_id === file)) || [];

    const deletedAttachment =
      deletedAttachments?.filter(file =>
        post.attachments.find(media => media.public_id === file),
      ) || [];

    const mediaFiles = FileUpload.getMediaFiles(files || []);
    const mediaPayload = await handelEditFile(
      this.school._id,
      post.media,
      "post",
      post._id,
      deletedMedia,
      mediaFiles,
    );

    const attachmentsFile = FileUpload.removeMediaFiles(files || []);
    const attachmentsPayload = await handelEditFile(
      this.school._id,
      post.attachments,
      "post",
      post._id,
      deletedAttachment,
      attachmentsFile,
    );

    return { attachmentsPayload, mediaPayload };
  }

  private async sendNotificationToUser(
    users: { id: ID; type: TEndUserEnum }[],
    postNewId: string,
  ): Promise<void> {
    const promises: Promise<void>[] = [];
    users.forEach(({ id, type }) => {
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
          { topic: NOTIFICATION_TYPES_ENUM.NEW_POST_ADDED, userType: type },
        ),
      );
    });
    await Promise.all(promises);
  }
}
