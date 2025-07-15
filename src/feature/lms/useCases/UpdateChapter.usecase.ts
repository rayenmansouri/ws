import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { InternalError } from "../../../core/ApplicationErrors";
import { BaseRepo } from "../../../core/BaseRepo";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { AdminRepo } from "../../admins/domain/Admin.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { BaseUserMetaData } from "../../users/domain/baseUser.entity";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";

type AddChapterUseCaseData = Partial<{
  name: string;
  description: string;
  chapterAttachmentFileNewIds: string[];
  userId: ID;
  userType: TEndAdministrationUserEnums;
}> & { chapterNewId: string };

@injectable()
export class UpdateChapterUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("AdminRepo") private adminRepo: AdminRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(data: AddChapterUseCaseData): Promise<void> {
    const { chapterNewId, chapterAttachmentFileNewIds, userId, userType } = data;

    const chapter = await this.chapterRepo.findOneByNewIdOrThrow(chapterNewId, "notFound.chapter");

    const chapterAttachments = chapterAttachmentFileNewIds
      ? await this.chapterAttachmentRepo.findManyByNewIdsOrThrow(
          chapterAttachmentFileNewIds,
          "notFound.chapterAttachment",
        )
      : undefined;

    const userRepo: BaseRepo<BaseUserMetaData> =
      userType === END_USER_ENUM.TEACHER ? this.teacherRepo : this.adminRepo;

    const user = userId ? await userRepo.findOneByIdOrThrow(userId, "notFound.user") : undefined;

    const classType = chapter.classType
      ? await this.classTypeRepo.findOneByIdOrThrow(chapter.classType, "notFound.classType")
      : undefined;

    if (userType === END_USER_ENUM.TEACHER && user) {
      ChapterService.ensureTeacherAccess(user as Teacher, chapter, classType);
    }

    //? chapterAttachments result does not respect the order of chapterAttachmentFileNewIds so we need to map them back to the original order
    const chapterAttachmentsIds = chapterAttachmentFileNewIds?.map(chapterAttachmentNewId => {
      const chapterAttachment = chapterAttachments?.find(
        attachment => attachment.newId === chapterAttachmentNewId,
      );
      if (!chapterAttachment) throw new InternalError("notFound.chapterAttachment");
      return chapterAttachment._id;
    });

    await this.chapterRepo.updateOneById(chapter._id, {
      createdBy: user?._id,
      userType: user && userType ? userType : undefined,
      name: data.name,
      description: data.description,
      attachments: chapterAttachmentsIds,
    });
  }
}
