import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { UserMapper } from "../../users/mappers/User.mapper";
import { StudentMetaData } from "../domain/student.entity";
import { StudentDto } from "../dtos/StudentList.dto";

export class StudentMapper {
  static toStudentDto(
    student: Populate<StudentMetaData, "classType" | "level" | "parents">,
  ): StudentDto {
    return {
      ...UserMapper.toBaseListUserDTO(student),
      level: EntityMapper.toEntityDto(student.level),
      parents: student.parents.map(parent => UserMapper.toUserProfileDTO(parent)),
      classType: EntityMapper.toEntityDto(student.classType),
      uniqueId: student.uniqueId,
    };
  }
}
