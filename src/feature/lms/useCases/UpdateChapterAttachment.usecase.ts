import { injectable } from "inversify";
import {
  FileManager,
  FileUploadPayload,
  VideoDetails,
} from "../../../core/fileManager/FileManager";
import {
  ChapterAttachmentFile,
  TChapterAttachmentStatusEnum,
} from "../domain/chapterAttachment.entity";
import { inject } from "../../../core/container/TypedContainer";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { ChapterAttachmentService } from "../domain/ChapterAttachment.service";
import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { FileUpload } from "../../../helpers/fileUpload";

type UpdateChapterAttachmentUseCaseDto = Partial<{
  name: string;
  description: string;
  teacherNewId: string;
  files: FileUploadPayload[];
  deleteFilesPaths: string[];
  status: TChapterAttachmentStatusEnum;
  classTypeNewIds: string[];
  subjectTypeNewIds: string[];
  subSubjectTypeNewIds: string[];
}> & {
  chapterAttachmentNewId: string;
  userType: TEndAdministrationUserEnums;
  userId: ID;
  tenantId: string;
};

@injectable()
export class UpdateChapterAttachmentUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
  ) {}

  async execute(input: UpdateChapterAttachmentUseCaseDto): Promise<void> {
    const {
      chapterAttachmentNewId,
      files,
      deleteFilesPaths,
      userType,
      userId,
      classTypeNewIds,
      subSubjectTypeNewIds,
      subjectTypeNewIds,
      teacherNewId,
    } = input;

    const chapterAttachment = await this.chapterAttachmentRepo.findOneByNewIdOrThrow(
      chapterAttachmentNewId,
      "notFound.chapterAttachment",
    );

    if (userType === END_USER_ENUM.TEACHER) {
      ChapterAttachmentService.ensureTeacherAccess(userId, chapterAttachment);
    }

    let newFiles = chapterAttachment.files;
    if (files) {
      ChapterAttachmentService.validateChapterAttachmentFiles(files);
      ChapterAttachmentService.ensureNewFileCompatibilityWithChapterAttachment(
        files,
        chapterAttachment,
      );
      const isEveryFileVideo = files.every(file => FileUpload.isVideoFile(file.mimetype));

      const video = isEveryFileVideo
        ? await this.fileManager.handelEditVideo({
            currentFiles: chapterAttachment.files as VideoDetails[],
            filesPathToBeDeleted: deleteFilesPaths,
            newFiles: files,
            filePath: "chapterAttachment",
            tenantId: input.tenantId,
          })
        : [];

      const uploadedFiles = !isEveryFileVideo
        ? await this.fileManager.handelEditFile({
            currentFiles: chapterAttachment.files,
            filesPathToBeDeleted: deleteFilesPaths,
            newFiles: files,
            filePath: "chapterAttachment",
          })
        : [];

      const chapterAttachmentFiles: ChapterAttachmentFile[] = uploadedFiles.map(file => ({
        ...file,
        attachmentType: "document",
        durationInSeconds: null,
      }));

      const chapterAttachmentVideo: ChapterAttachmentFile[] = video.map(file => ({
        ...file,
        attachmentType: "video",
      }));

      newFiles = [...chapterAttachmentFiles, ...chapterAttachmentVideo];
    }

    const teacherId = teacherNewId
      ? (await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher"))._id
      : undefined;

    const classTypePromises = classTypeNewIds
      ? this.classTypeRepo.findManyByNewIdsOrThrow(classTypeNewIds, "notFound.classType")
      : undefined;

    const subjectTypePromises = subjectTypeNewIds
      ? this.subjectTypeRepo.findManyByNewIdsOrThrow(subjectTypeNewIds, "notFound.subjectType")
      : undefined;
    const subSubjectTypePromises = subSubjectTypeNewIds
      ? this.subSubjectTypeRepo.findManyByNewIdsOrThrow(
          subSubjectTypeNewIds,
          "notFound.subSubjectType",
        )
      : undefined;

    const [classTypes, subjectTypes, subSubjectTypes] = await Promise.all([
      classTypePromises,
      subjectTypePromises,
      subSubjectTypePromises,
    ]);

    const classTypeIds = classTypes?.map(classType => classType._id);
    const subjectTypeIds = subjectTypes?.map(subjectType => subjectType._id);
    const subSubjectTypeIds = subSubjectTypes?.map(subSubjectType => subSubjectType._id);

    await this.chapterAttachmentRepo.updateOneById(chapterAttachment._id, {
      name: input.name,
      description: input.description,
      teacher: teacherId,
      status: input.status,
      files: newFiles,
      classTypes: classTypeIds,
      subjectTypes: subjectTypeIds,
      subSubjectTypes: subSubjectTypeIds,
    });
  }
}
