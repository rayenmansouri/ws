import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { FileUpload } from "../../../helpers/fileUpload";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import {
  CHAPTER_ATTACHMENT_FILE_TYPE_ENUM,
  CHAPTER_ATTACHMENT_STATUS_ENUM,
  ChapterAttachmentFile,
} from "../domain/chapterAttachment.entity";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { ChapterAttachmentService } from "../domain/ChapterAttachment.service";
import { TeacherService } from "../../teachers/domain/Teacher.service";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { NotFoundError } from "../../../core/ApplicationErrors";

type AddChapterAttachmentUseCaseInput = {
  name: string;
  description: string | undefined;
  teacherNewId: string;
  files: FileUploadPayload[];
  classTypeNewIds?: string[];
  subjectTypeNewIds?: string[];
  subSubjectTypeNewIds?: string[];
  tenantId: string;
};

@injectable()
export class AddChapterAttachmentUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubjectTypeRepo,
  ) {}

  async execute(data: AddChapterAttachmentUseCaseInput): Promise<void> {
    ChapterAttachmentService.validateChapterAttachmentFiles(data.files);
    const {
      name,
      description,
      teacherNewId,
      files,
      classTypeNewIds,
      subSubjectTypeNewIds,
      subjectTypeNewIds,
    } = data;

    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher");

    const classTypePromises = classTypeNewIds
      ? this.classTypeRepo.findManyByNewIdsOrThrow(classTypeNewIds, "notFound.classType")
      : [];
    const subjectTypePromises = subjectTypeNewIds
      ? this.subjectTypeRepo.findManyByNewIdsOrThrow(subjectTypeNewIds, "notFound.subjectType")
      : [];
    const subSubjectTypePromises = subSubjectTypeNewIds
      ? this.subSubjectTypeRepo.findManyByNewIdsOrThrow(
          subSubjectTypeNewIds,
          "notFound.subSubjectType",
        )
      : [];
    const [classTypes, subjectTypes, subSubjectTypes] = await Promise.all([
      classTypePromises,
      subjectTypePromises,
      subSubjectTypePromises,
    ]);

    const classTypeIds = classTypes.map(classType => classType._id);
    const subjectTypeIds = subjectTypes.map(subjectType => subjectType._id);
    const subSubjectTypeIds = subSubjectTypes.map(subSubjectType => subSubjectType._id);

    subjectTypes.forEach(subjectType =>
      TeacherService.checkTeacherSubjectEligibility(teacher, subjectType),
    );

    const subjectTypeIdsFromSubSubjectTypes = classTypes
      .flatMap(classType =>
        subSubjectTypes.map(subSubjectType =>
          ClassTypeService.getSubjectTypeIdFromClassTypeBySubSubjectType(classType, subSubjectType),
        ),
      )
      .filter(subSubjectTypeId => subSubjectTypeId !== null);

    if (subjectTypeIdsFromSubSubjectTypes.length != subSubjectTypes.length) {
      throw new NotFoundError("classType.subjectTypeNotFound");
    }

    subjectTypeIdsFromSubSubjectTypes.forEach(subjectTypeId => {
      TeacherService.checkTeacherSubjectEligibility(teacher, { _id: subjectTypeId });
    });

    const isVideoFile = files.every(file => FileUpload.isVideoFile(file.mimetype));

    const paths = FileManager.generateFilePaths(files, data.tenantId, "chapterAttachment");

    const videos = isVideoFile
      ? await this.fileManager.uploadVideosFile(files, "chapterAttachment", data.tenantId)
      : [];

    const uploadedFiles = !isVideoFile ? await this.fileManager.uploadFiles(files, paths) : [];

    const chapterDocuments = uploadedFiles.map<ChapterAttachmentFile>(file => ({
      ...file,
      attachmentType: CHAPTER_ATTACHMENT_FILE_TYPE_ENUM.DOCUMENT,
      durationInSeconds: null,
    }));

    const videoDocuments = videos.map<ChapterAttachmentFile>(video => ({
      ...video,
      attachmentType: CHAPTER_ATTACHMENT_FILE_TYPE_ENUM.VIDEO,
    }));

    const chapterAttachmentFile: ChapterAttachmentFile[] = [...chapterDocuments, ...videoDocuments];

    await this.chapterAttachmentRepo.addOne({
      name,
      description: description || null,
      teacher: teacher._id,
      files: chapterAttachmentFile,
      status: CHAPTER_ATTACHMENT_STATUS_ENUM.UNUSED,
      classTypes: classTypeIds,
      subjectTypes: subjectTypeIds,
      subSubjectTypes: subSubjectTypeIds,
    });
  }
}
