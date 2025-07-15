import { BadRequestError, ForbiddenError } from "../../../core/ApplicationErrors";
import { FileUploadPayload } from "../../../core/fileManager/FileManager";
import { FileUpload } from "../../../helpers/fileUpload";
import { ID } from "../../../types/BaseEntity";
import { ChapterAttachment } from "./chapterAttachment.entity";

export class ChapterAttachmentService {
  static ensureTeacherAccess(
    teacherId: ID,
    chapterAttachment: Pick<ChapterAttachment, "teacher">,
  ): void {
    if (chapterAttachment.teacher !== teacherId) throw new ForbiddenError("global.accessDenied");
  }

  static validateChapterAttachmentFiles(files: FileUploadPayload[]): void {
    const videos = files.filter(file => FileUpload.isVideoFile(file.mimetype));
    const isVideosListEmpty = videos.length === 0;
    if (isVideosListEmpty) return;

    const isAttachmentTypeDifferent = videos.length != files.length;

    if (isAttachmentTypeDifferent) {
      throw new BadRequestError("chapterAttachment.videoAndOtherFiles");
    }
  }

  static ensureNewFileCompatibilityWithChapterAttachment(
    files: FileUploadPayload[],
    chapterAttachment: Pick<ChapterAttachment, "files">,
  ): void {
    const chapterAttachmentType = chapterAttachment.files[0].attachmentType; // Assuming all files have the same type

    const isEveryFileVideo = files.every(file => FileUpload.isVideoFile(file.mimetype));
    const isEveryFileDocument = files.every(file => !FileUpload.isVideoFile(file.mimetype));
    const isAttachmentTypeDifferent =
      (isEveryFileVideo && chapterAttachmentType !== "video") ||
      (isEveryFileDocument && chapterAttachmentType !== "document");

    if (isAttachmentTypeDifferent) {
      throw new BadRequestError("chapterAttachment.videoAndOtherFiles");
    }
  }
}
