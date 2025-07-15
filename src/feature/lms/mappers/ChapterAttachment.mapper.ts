import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ChapterAttachmentMetaData } from "../domain/chapterAttachment.entity";
import { ChapterAttachmentDetailsDto, ChapterAttachmentDto } from "../dtos/ChapterAttachment.dto";

export class ChapterAttachmentMapper {
  static toChapterAttachmentDto(
    document: Populate<
      ChapterAttachmentMetaData,
      "teacher" | "classTypes" | "subjectTypes" | "subSubjectTypes"
    >,
  ): ChapterAttachmentDto {
    return {
      _id: document._id,
      newId: document.newId,
      name: document.name,
      status: document.status,
      description: document.description,
      teacher: UserMapper.toUserProfileDTO(document.teacher),
      files: document.files,
      type: document.files[0]?.attachmentType,
      createdAt: document.createdAt,
      classTypes: document.classTypes.map(EntityMapper.toEntityDto),
      subjectTypes: document.subjectTypes.map(EntityMapper.toEntityDto),
      subSubjectTypes: document.subSubjectTypes.map(EntityMapper.toEntityDto),
    };
  }

  static toChapterAttachmentDetailsDto(
    document: Populate<ChapterAttachmentMetaData, "teacher">,
  ): ChapterAttachmentDetailsDto {
    return {
      _id: document._id,
      newId: document.newId,
      name: document.name,
      status: document.status,
      description: document.description,
      teacher: UserMapper.toUserProfileDTO(document.teacher),
      files: document.files.map((file, i) => ({ ...file, id: String(i) })),
      createdAt: document.createdAt,
      type: document.files[0]?.attachmentType,
    };
  }
}
