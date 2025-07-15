import { ID } from "../../../types/BaseEntity";
import { SectionDto } from "../dtos/section.dto";

export class SectionMapper {
  static toSectionDto(section: {
    newId: string;
    _id: ID;
    name: string;
    subLevels: { name: string; newId: string; _id: ID }[];
  }): SectionDto {
    return {
      newId: section.newId,
      _id: section._id,
      name: section.name,
      subLevels: section.subLevels.map(subLevel => ({
        _id: subLevel._id,
        name: subLevel.name,
        newId: subLevel.newId,
      })),
    };
  }
}
