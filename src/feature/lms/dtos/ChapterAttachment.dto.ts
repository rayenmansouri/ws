import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import {
  ChapterAttachmentFile,
  TChapterAttachmentFileTypeEnum,
  TChapterAttachmentStatusEnum,
} from "../domain/chapterAttachment.entity";

export type ChapterAttachmentDto = {
  _id: ID;
  newId: string;
  name: string;
  status: TChapterAttachmentStatusEnum;
  type: TChapterAttachmentFileTypeEnum;
  description: string | null;
  teacher: UserProfileDTO;
  files: ChapterAttachmentFile[];
  createdAt: Date;
  classTypes: EntityDto[];
  subjectTypes: EntityDto[];
  subSubjectTypes: EntityDto[];
};

export type ChapterAttachmentDetailsDto = {
  _id: ID;
  newId: string;
  name: string;
  status: TChapterAttachmentStatusEnum;
  description: string | null;
  teacher: UserProfileDTO;
  files: (ChapterAttachmentFile & { id: string })[];
  createdAt: Date;
  type: TChapterAttachmentFileTypeEnum;
};
