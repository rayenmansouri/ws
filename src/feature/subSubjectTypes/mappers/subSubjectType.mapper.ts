import { SubSubjectType } from "../domains/subSubjectType.entity";
import { SubSubjectTypeDto } from "../dtos/subSubjectType.dto";

export class SubSubjectTypeMapper {
  static toSubSubjectTypeDTO(
    subSubjectType: Pick<
      SubSubjectType,
      "_id" | "newId" | "name" | "preferredStartingHours" | "illustration"
    >,
  ): SubSubjectTypeDto {
    return {
      _id: subSubjectType._id,
      newId: subSubjectType.newId,
      name: subSubjectType.name,
      preferredStartingHours: subSubjectType.preferredStartingHours,
      illustration: subSubjectType.illustration,
    };
  }
}
