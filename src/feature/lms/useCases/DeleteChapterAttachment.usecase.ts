import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { ChapterRepo } from "../domain/Chapter.repo";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { ChapterAttachmentService } from "../domain/ChapterAttachment.service";

type DeleteChapterAttachmentUseCaseInput = {
  chapterAttachmentNewId: string;
  userType: TEndAdministrationUserEnums;
  userId: ID;
};
@injectable()
export class DeleteChapterAttachmentUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("ChapterRepo") private chapterRepo: ChapterRepo,
  ) {}

  async execute(input: DeleteChapterAttachmentUseCaseInput): Promise<void> {
    const { chapterAttachmentNewId, userType, userId } = input;
    const chapterAttachment = await this.chapterAttachmentRepo.findOneByNewIdOrThrow(
      chapterAttachmentNewId,
      "notFound.chapterAttachment",
    );

    if (userType === END_USER_ENUM.TEACHER) {
      ChapterAttachmentService.ensureTeacherAccess(userId, chapterAttachment);
    }

    const filePaths = chapterAttachment.files.map(file => file.path);
    await this.fileManager.deleteFiles(filePaths);

    await this.chapterAttachmentRepo.deleteOneById(chapterAttachment._id);
    await this.chapterRepo.removeChapterAttachments([chapterAttachment._id]);
  }
}
