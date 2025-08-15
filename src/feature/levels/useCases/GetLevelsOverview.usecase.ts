import { injectable } from "inversify";
import { InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassService } from "../../classes/domain/Class.service";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { SubLevel } from "../../subLevels/domains/subLevel.entity";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { LevelOverviewDto } from "../dto/LevelOverview.dto";
import { LevelOverviewMapper } from "../mapper/LevelOverview.mapper";
import { LevelRepo } from "../repos/Level.repo";
import { SchoolYear } from "./../../schoolYears/domain/schoolYear.entity";

@injectable()
export class GetLevelsOverviewUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(): Promise<LevelOverviewDto[]> {
    const schoolYears = await this.schoolYearRepo.findAll();
    const levels = (await this.levelRepo.findAll()).sort((a, b) => a.rank - b.rank);
    const subLevels = await this.subLevelRepo.findAll();

    const subLevelsOverview = (
      await Promise.all(
        levels.map(level => {
          const subLevel = subLevels
            .filter(subLevel => subLevel.level._id === level._id)
            .sort((a, b) => a.rank - b.rank);
          return this.getSubLevelsOfLevelOverview(subLevel);
        }),
      )
    ).flat();

    const response = levels.map(level => {
      const levelSchoolYears: SchoolYear[] = schoolYears.filter(
        schoolYear => schoolYear.level === level._id,
      );

      const subLevels = subLevelsOverview
        .filter(subLevelOverview => subLevelOverview.subLevel.level._id === level._id)
        .sort((a, b) => a.subLevel.rank - b.subLevel.rank);

      return {
        level,
        schoolYears: levelSchoolYears,
        subLevelsOverview: subLevels,
      };
    });

    return response.map(levelOverview => LevelOverviewMapper.toLevelOverviewDto(levelOverview));
  }

  private async getSubLevelsOfLevelOverview(
    subLevels: SubLevel[],
  ): Promise<
    { subLevel: SubLevel; classNumber: number; studentNumber: number; teacherNumber: number }[]
  > {
    const subLevelIds = subLevels.map(subLevel => subLevel._id);

    const classTypesBySubLevel = await this.classTypeRepo.findManyGroupedBySubLevel(subLevelIds);

    const classTypeIds = classTypesBySubLevel.flatMap(classTypeOfSubLevel =>
      classTypeOfSubLevel.classTypes.map(classType => classType._id),
    );

    const classDocs = await this.classRepo.findManyByClassTypes(classTypeIds);

    const response = classTypesBySubLevel.map(classTypeOfSubLevel => {
      const { subLevelId, classTypes } = classTypeOfSubLevel;
      const classTypeIds = classTypes.map(classType => classType._id);
      const subLevel = subLevels.find(subLevel => subLevel._id === subLevelId);
      if (!subLevel) throw new InternalError(`SubLevel ${subLevelId} not found`);
      const classes = classDocs.filter(classDoc => classTypeIds.includes(classDoc.classType));

      return {
        subLevel,
        classNumber: classes.length,
        studentNumber: ClassService.countStudents(classes),
        teacherNumber: ClassService.countTeachers(classes),
      };
    });

    //? sublevels that have no class types are not returned, we need to add them manually.
    const subLevelsWithNoClassTypes = subLevels.filter(
      subLevel => !classTypesBySubLevel.find(classType => classType.subLevelId === subLevel._id),
    );

    const emptySubLevelOverview = subLevelsWithNoClassTypes.map(subLevel => ({
      subLevel,
      classNumber: 0,
      studentNumber: 0,
      teacherNumber: 0,
    }));

    return response.concat(emptySubLevelOverview);
  }
}
