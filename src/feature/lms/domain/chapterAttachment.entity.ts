import { FileDetails } from "../../../core/fileManager/FileManager";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";

export const CHAPTER_ATTACHMENT_STATUS_ENUM = {
  USED: "used",
  UNUSED: "unused",
} as const;
export type TChapterAttachmentStatusEnum =
  (typeof CHAPTER_ATTACHMENT_STATUS_ENUM)[keyof typeof CHAPTER_ATTACHMENT_STATUS_ENUM];

export const CHAPTER_ATTACHMENT_FILE_TYPE_ENUM = {
  VIDEO: "video",
  DOCUMENT: "document",
} as const;
export type TChapterAttachmentFileTypeEnum =
  (typeof CHAPTER_ATTACHMENT_FILE_TYPE_ENUM)[keyof typeof CHAPTER_ATTACHMENT_FILE_TYPE_ENUM];

export type ChapterAttachmentFile = FileDetails & {
  attachmentType: TChapterAttachmentFileTypeEnum;
  durationInSeconds: number | null; // Duration in seconds for video files
};

export type ChapterAttachment = {
  name: string;
  description: string | null;
  teacher: ID;
  status: TChapterAttachmentStatusEnum;
  files: ChapterAttachmentFile[];
  classTypes: ID[];
  subjectTypes: ID[];
  subSubjectTypes: ID[];
} & BaseEntity;

export type ChapterAttachmentMetaData = GenerateMetaData<
  ChapterAttachment,
  {
    teacher: Teacher;
    classTypes: ClassType[];
    subjectTypes: SubjectType[];
    subSubjectTypes: SubjectType[];
  }
>;
