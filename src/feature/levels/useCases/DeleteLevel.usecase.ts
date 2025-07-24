import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../repos/Level.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";

@injectable()
export class DeleteLevelUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(levelNewId: string): Promise<void> {
    const level = await this.levelRepo.findOneByNewIdOrThrow(levelNewId, "notFound.level");

    const schoolYear = await this.schoolYearRepo.findManyByLevel(level._id);
    const hasMultipleSchoolYear = schoolYear.length > 1;
    if (hasMultipleSchoolYear) throw new BadRequestError("level.hasMultipleSchoolYear");

    const subLevels = await this.subLevelRepo.findManyByLevel(level._id);
    if (subLevels.length > 0) throw new BadRequestError("level.hasSubLevels");

    const subLevelIds = subLevels.map(subLevel => subLevel._id);
    const classTypes = await this.classTypeRepo.findManySubLevels(subLevelIds);

    if (classTypes.length > 0) throw new BadRequestError("level.hasClassTypes");

    const teacher = await this.teacherRepo.findManyByLevel(level._id);
    if (teacher.length > 0) throw new BadRequestError("level.hasTeacher");

    const students = await this.studentRepo.findManyByLevel(level._id);
    if (students.length > 0) throw new BadRequestError("level.hasStudents");

    await this.levelRepo.deleteOneById(level._id);
    await this.schoolYearRepo.deleteOneById(level.currentSchoolYear._id);
  }
}
