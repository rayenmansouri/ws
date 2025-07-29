import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { Student } from "../../students/domain/student.entity";
import { Group, GroupMetaData } from "../domains/group.entity";
import { GroupDto } from "../dtos/Group.dto";
import { GroupOverviewDTO } from "../dtos/GroupOverview.dto";
import { StudentInGroupDto } from "../dtos/StudentInGroup.dto";

export class GroupMapper {
  static toGroupDto(group: Pick<Group, "name" | "newId" | "_id">): GroupDto {
    return EntityMapper.toEntityDto(group);
  }

  static toStudentInGroupDto(student: Student): StudentInGroupDto {
    return {
      _id: student._id,
      newId: student.newId,
      avatar: student.avatar.link,
      email: student.email,
      fullName: student.fullName,
      gender: student.gender,
    };
  }

  static toGroupOverviewDto(group: Populate<GroupMetaData, "schoolYears">): GroupOverviewDTO {
    return {
      ...EntityMapper.toEntityDto(group),
    };
  }
}
