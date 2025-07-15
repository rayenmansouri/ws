import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { FileDetails } from "../../../core/fileManager/FileManager";
import { Populate } from "../../../core/populateTypes";
import { OnlyOne } from "../../../types/types";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { EntityDto } from "../../entity/dto/entity.dto";
import { GroupDto } from "../../groupManagement/dtos/Group.dto";
import { HomeworkMetaData } from "../../homeworks/domain/homework.entity";
import { ObservationMetaData } from "../../observations/domain/observation.entity";
import { Session, SessionMetaData } from "../../sessionManagement/domain/session.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { DOCUMENT_SOURCE_ENUM, DocumentDto, DocumentFilterDto } from "../dtos/document.dto";

export class DocumentMapper {
  static toDocumentFilterDto(data: {
    teachers: UserProfileDTO[];
    subjectTypes: EntityDto[];
    groups: GroupDto[];
  }): DocumentFilterDto {
    return {
      teachers: data.teachers,
      subjectTypes: data.subjectTypes,
      groups: data.groups,
      sources: [
        DOCUMENT_SOURCE_ENUM.HOMEWORK,
        DOCUMENT_SOURCE_ENUM.OBSERVATION,
        DOCUMENT_SOURCE_ENUM.SESSION_SUMMARY,
      ],
    };
  }

  static toDocumentDto(
    data: OnlyOne<{
      session: Populate<SessionMetaData, "teacher" | "subjectType" | "subSubjectType" | "group">;
      homework: Populate<HomeworkMetaData, "teacher" | "addedByAdmin">;
      observation: Populate<ObservationMetaData, "issuer">;
    }>,
  ): DocumentDto {
    const files = data.session?.files || data.homework?.files || data.observation?.files || [];
    let userType: PickFromEnum<TEndUserEnum, "admin" | "teacher"> | null = null;
    const user: BaseUser | null =
      data.session?.teacher ||
      data.observation?.issuer ||
      data.homework?.teacher ||
      data.homework?.addedByAdmin ||
      null;
    if (data.session?.teacher) userType = END_USER_ENUM.TEACHER;
    if (data.observation) userType = data.observation.issuerType;
    if (data.homework?.teacher) userType = END_USER_ENUM.TEACHER;
    if (data.homework?.addedByAdmin) userType = END_USER_ENUM.ADMIN;

    const source = data.session || data.homework || data.observation;

    const name = data.observation
      ? data.observation.observationReason.name
      : data.homework
      ? data.homework.name
      : data.session.subjectType?.name ||
        data.session.subSubjectType?.name ||
        data.session.group?.groupType.name;

    const date = data.session?.startTime || source?.createdAt;

    const sourceType = data.session
      ? DOCUMENT_SOURCE_ENUM.SESSION_SUMMARY
      : data.homework
      ? DOCUMENT_SOURCE_ENUM.HOMEWORK
      : DOCUMENT_SOURCE_ENUM.OBSERVATION;

    return {
      name: name!,
      documents: files.map(DocumentMapper.toDocumentItemDto),
      documentCount: files.length,
      createdAt: date,
      source: { type: sourceType, newId: source?.newId, _id: source?._id },
      userName: user?.fullName || null,
      userType: userType,
    };
  }

  //TODO this types should change the file type after the file upload refactor
  private static toDocumentItemDto(
    file: Session["files"][number] | FileDetails,
  ): DocumentDto["documents"][number] {
    const link = "url" in file ? file.url : file.link;
    return { name: file.name, link, mimeType: file.mimeType };
  }
}
