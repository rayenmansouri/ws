import { EntityScheduleDto } from "../dtos/entitySchedule.dto";

export class EntityScheduleMapper {
  static toEntityScheduleDto(entity: EntityScheduleDto): EntityScheduleDto {
    return {
      _id: entity._id,
      avatar: entity.avatar,
      name: entity.name,
      newId: entity.newId,
      type: entity.type,
    };
  }
}
