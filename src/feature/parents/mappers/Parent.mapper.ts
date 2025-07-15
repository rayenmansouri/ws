import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "../../students/domain/student.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { Parent, ParentMetaData } from "../domain/parent.entity";
import { ParentDetailsDTO, ParentDTO } from "../dtos/Parent.dto";

export class ParentMapper {
  static toDTO(parent: Populate<ParentMetaData, "students">): ParentDTO {
    return {
      ...UserMapper.toBaseListUserDTO(parent),
      nationalCardId: parent.nationalCardId,
      students: parent.students.map(student => ({
        ...UserMapper.toUserProfileDTO(student),
        gender: student.gender,
        birthDate: student.birthDate!, //birth date in students is guaranteed to be present,
      })),
    };
  }

  static toParentDetailsDTO(
    parent: Omit<Parent, "students"> & { students: (Student & { schoolYears: SchoolYear[] })[] },
  ): ParentDetailsDTO {
    return {
      ...UserMapper.toBaseListUserDTO(parent),
      nationalCardId: parent.nationalCardId,
      students: parent.students.map(student => ({
        ...UserMapper.toUserProfileDTO(student),
        gender: student.gender,
        birthDate: student.birthDate!, //birth date in students is guaranteed to be present,
        schoolYears: student.schoolYears.map(EntityMapper.toEntityDto),
      })),
    };
  }
}
