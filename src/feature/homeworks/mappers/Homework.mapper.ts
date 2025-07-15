import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { UserMapper } from "../../users/mappers/User.mapper";
import { HomeworkMetaData } from "../domain/homework.entity";
import { HomeworkDTO } from "../dtos/homework.dto";

export class HomeworkMapper {
  static toHomeworkDTO(
    homework: Populate<
      HomeworkMetaData,
      "class" | "group" | "subSubjectType" | "subjectType" | "teacher" | "classGroup"
    >,
  ): HomeworkDTO {
    return {
      _id: homework._id,
      newId: homework.newId,
      name: homework.name,
      description: homework.description,
      teacher: homework.teacher ? UserMapper.toUserProfileDTO(homework.teacher) : null,
      subjectType: homework.subjectType ? EntityMapper.toEntityDto(homework.subjectType) : null,
      subSubjectType: homework.subSubjectType
        ? EntityMapper.toEntityDto(homework.subSubjectType)
        : null,
      group: homework.group ? EntityMapper.toEntityDto(homework.group) : null,
      groupType: homework.group ? EntityMapper.toEntityDto(homework.group.groupType) : null,
      class: homework.class ? EntityMapper.toEntityDto(homework.class) : null,
      classGroup: homework.classGroup ? EntityMapper.toEntityDto(homework.classGroup) : null,
      files: homework.files.map(file => ({
        public_id: file.public_id,
        name: file.name,
        url: file.url,
        date: file.date,
        size: file.size,
        mimeType: file.mimeType,
      })),
      status: homework.status,
      createdAt: homework.createdAt,
      dueDate: homework.dueDate,
    };
  }
}
