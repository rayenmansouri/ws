import { Populate } from "../../../core/populateTypes";
import { TLanguageEnum } from "../../../translation/constants";
import { Role } from "../../authorization/domain/role.entity";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { UserMapper } from "../../users/mappers/User.mapper";
import { TeacherMetaData } from "../domain/teacher.entity";
import { TeacherDTO } from "../dtos/Teacher.dto";

export class TeacherMapper {
  static toDTO(
    teacher: Populate<TeacherMetaData, "levels" | "groupTypes" | "subjectTypes">,
    roles: Role[],
    language: TLanguageEnum,
  ): TeacherDTO {
    return {
      ...UserMapper.toBaseListUserDTO(teacher),
      levels: teacher.levels.map(EntityMapper.toEntityDto),
      groupTypes: teacher.groupTypes.map(EntityMapper.toEntityDto),
      subjectTypes: teacher.subjectTypes.map(EntityMapper.toEntityDto),
      roles: roles.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.translation[language],
      })),
      topics: [...teacher.subjectTypes, ...teacher.groupTypes].map(EntityMapper.toEntityDto),
    };
  }
}
