import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { SubLevel } from "../../subLevels/domains/subLevel.entity";
import { Level } from "../domains/level.entity";
import { LevelOverviewDto } from "../dto/LevelOverview.dto";
import { SchoolYear } from "./../../schoolYears/domain/schoolYear.entity";

export class LevelOverviewMapper {
  static toLevelOverviewDto(data: {
    level: Level;
    schoolYears: SchoolYear[];
    subLevelsOverview: {
      subLevel: SubLevel;
      classNumber: number;
      studentNumber: number;
      teacherNumber: number;
    }[];
  }): LevelOverviewDto {
    const { level, subLevelsOverview } = data;
    return {
      ...EntityMapper.toEntityDto(level),
      color: data.level.color,
      subLevelsOverview: subLevelsOverview.map(subLevelOverview => ({
        subLevel: EntityMapper.toEntityDto(subLevelOverview.subLevel),
        classNumber: subLevelOverview.classNumber,
        studentNumber: subLevelOverview.studentNumber,
        teacherNumber: subLevelOverview.teacherNumber,
      })),
    };
  }
}
