import { BaseEntity } from "../../../types/BaseEntity";
import { EntityDto } from "../dto/entity.dto";

export class EntityMapper {
  static toEntityDto(
    entity: Omit<BaseEntity, "createdAt" | "updatedAt"> & { name: string },
  ): EntityDto {
    return {
      _id: entity._id,
      name: entity.name,
      newId: entity.newId,
    };
  }
}
