import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import {
  EXAM_GRADE_SYSTEM_ENUM,
  Level,
  TEstablishmentTitleEnum,
  TExamGradeSystemEnum,
} from "../domains/level.entity";
import { LevelRepo } from "../repos/Level.repo";
import { AddSchoolYearUseCase } from "../../schoolYears/useCases/AddSchoolYear.usecase";
import { INSTANCE_TYPE_ENUM, School } from "../../schools/domain/school.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class AddLevelUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("AddSchoolYearUseCase") private addSchoolYearUseCase: AddSchoolYearUseCase,
    @inject("School") private school: School,
  ) {}

  async execute(data: {
    name: string;
    color: string;
    schoolYear: {
      terms: { termNewId: string; startDate: Date; endDate: Date }[];
      name: string;
      startDate: Date;
      endDate: Date;
    };
    establishmentTitle?: TEstablishmentTitleEnum;
    examGradeSystem?: TExamGradeSystemEnum;
  }): Promise<Level> {
    await this.levelRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const levels = await this.levelRepo.findAll();

    const levelRanks = levels.map(level => level.rank);

    const newRank = levelRanks.length === 0 ? 1 : Math.max(...levelRanks) + 1;

    //if (
    //  this.school.instanceType !== INSTANCE_TYPE_ENUM.TUNISIAN &&
    //  (data.examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.PRIMARY ||
    //    data.examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.SECONDARY)
    //)
    //  throw new BadRequestError("level.unsupportedExamGradeSystem");

    const level = await this.levelRepo.addOne({
      name: data.name,
      currentSchoolYear: {} as SchoolYear,
      color: data.color,
      rank: newRank,
      establishmentTitle: data.establishmentTitle || null,
      examGradeSystem: data.examGradeSystem || null,
    });

    const schoolYear = await this.addSchoolYearUseCase.execute({
      name: data.schoolYear.name,
      startDate: data.schoolYear.startDate,
      endDate: data.schoolYear.endDate,
      terms: data.schoolYear.terms,
      levelNewId: level.newId,
    });

    await this.levelRepo.updateOneById(level._id, {
      currentSchoolYear: schoolYear,
    });

    return { ...level, currentSchoolYear: schoolYear };
  }
}
