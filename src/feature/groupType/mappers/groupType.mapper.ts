import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { GroupTypeMetaData } from "../../groupManagement/domains/groupType.entity";
import { GroupTypeDto } from "../dtos/groupType.dto";

export class GroupTypeMapper {
  static toGroupTypeDto(groupType: Populate<GroupTypeMetaData, "exams.examType">): GroupTypeDto {
    return {
      ...EntityMapper.toEntityDto(groupType),
      coefficient: groupType.coefficient,
      illustration: groupType.illustration,
    };
  }
}
