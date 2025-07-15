import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { LevelDegreesCoverageDTO } from "../dto/LevelCoverage.dto";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { EXAM_GRADE_SYSTEM_ENUM } from "../../levels/domains/level.entity";

@injectable()
export class GetLevelDegreesCoverageUsecase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async execute(): Promise<LevelDegreesCoverageDTO> {
    const allLevels = await this.levelRepo.findAll();
    const allSubLevels = await this.subLevelRepo.findAll();
    const allClasses = await this.classRepo.findAll({ populate: ["classType"] });

    const levelsCoverages: LevelDegreesCoverageDTO["levels"] = [];
    for (const level of allLevels) {
      const isAutomaticPromotion =
        level.examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.AUTOMATIC_PROMOTION;

      const subLevelsOfLevel = allSubLevels
        .filter(subLevel => subLevel.level._id === level._id)
        .sort((a, b) => a.rank - b.rank);

      const subLevels: LevelDegreesCoverageDTO["levels"][0]["subLevels"] = [];
      for (const subLevel of subLevelsOfLevel) {
        const classesOfSubLevel = allClasses.filter(
          classDoc =>
            classDoc.classType.subLevel === subLevel._id &&
            classDoc.schoolYear === level.currentSchoolYear._id,
        );

        if (isAutomaticPromotion) {
          subLevels.push({
            name: subLevel.name,
            areAllTermsCompleted: true,
            classesPreventingSwitch: [],
          });
          continue;
        }

        subLevels.push({
          name: subLevel.name,
          areAllTermsCompleted: classesOfSubLevel.every(
            classDoc => classDoc.gradeReports.length === level.currentSchoolYear.terms.length,
          ),
          classesPreventingSwitch: classesOfSubLevel
            .filter(
              classDoc => classDoc.gradeReports.length !== level.currentSchoolYear.terms.length,
            )
            .map(classDoc => ({
              id: classDoc._id,
              name: classDoc.name,
              newId: classDoc.classType.newId,
            })),
        });
      }

      levelsCoverages.push({
        level: {
          _id: level._id,
          newId: level.newId,
          name: level.name,
          color: level.color,
        },
        subLevels,
      });
    }

    return {
      levels: levelsCoverages,
      canSwitchToNextYear: levelsCoverages.every(level =>
        level.subLevels.every(subLevel => subLevel.areAllTermsCompleted),
      ),
    };
  }
}
