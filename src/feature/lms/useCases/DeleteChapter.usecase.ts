import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { Role } from "../../authorization/domain/role.entity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { CHAPTER_ATTACHMENT_STATUS_ENUM } from "../domain/chapterAttachment.entity";

type DeleteChapterUseCaseInput = {
  chapterNewId: string;
  user: Omit<BaseUser, "roles"> & { roles: Role[] };
  userType: TEndAdministrationUserEnums;
};

@injectable()
export class DeleteChapterUseCase {
  constructor(
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(input: DeleteChapterUseCaseInput): Promise<void> {
    const { chapterNewId, user, userType } = input;
    const chapter = await this.chapterRepo.findOneByNewIdOrThrow(chapterNewId, "notFound.chapter");

    const chapterAttachmentIds = chapter.attachments;

    const classType = chapter.classType
      ? await this.classTypeRepo.findOneByIdOrThrow(chapter.classType, "notFound.classType")
      : undefined;

    if (userType === END_USER_ENUM.TEACHER)
      ChapterService.ensureTeacherAccess(user as unknown as Teacher, chapter, classType);

    const chapterStillUsedAttachments = await this.chapterRepo.getChapterByAttachmentId(
      chapterAttachmentIds,
    );

    const otherChapterStillUsedAttachmentsIds = chapterStillUsedAttachments
      .map(chapter => chapter._id)
      .filter(chapterId => chapterId != chapter._id);

    const chapterAttachmentsToDeleteIds = chapterAttachmentIds.filter(
      attachmentId => !otherChapterStillUsedAttachmentsIds.includes(attachmentId),
    );

    await this.chapterAttachmentRepo.updateManyByIds(chapterAttachmentsToDeleteIds, {
      status: CHAPTER_ATTACHMENT_STATUS_ENUM.UNUSED,
    });

    await this.chapterRepo.deleteOneById(chapter._id);
  }
}
