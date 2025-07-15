import { SchoolYearDto } from "./../dtos/schoolYear.dto";
import { SchoolYearMetaData } from "./../domain/schoolYear.entity";
import { Populate } from "../../../core/populateTypes";

export class SchoolYearMapper {
  static toSchoolYearDto(schoolYear: Populate<SchoolYearMetaData, "level">): SchoolYearDto {
    return {
      _id: schoolYear._id,
      name: schoolYear.name,
      newId: schoolYear.newId,
      startDate: schoolYear.startDate,
      endDate: schoolYear.endDate,
      levelName: schoolYear.level.name,
    };
  }
}
