import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBSubjectOfClassDTO } from "../../dto/ib/IBSubjectOfClass.dto";

@injectable()
export class GetIBSubjectsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo")
    private ibClassGradesRepo: IBClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    userType,
    userId,
  }: {
    classNewId: string;
    termNewId: string;
    userType: TEndUserEnum;
    userId: ID;
  }): Promise<IBSubjectOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER) {
      const classTeachers = Object.values(classDoc.subjectTeacherMap);
      const isTeacherOfClass = classTeachers.some(teacher => teacher === userId);

      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const ibClassGrades = await this.ibClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subjects: IBSubjectOfClassDTO["subjects"] = [];
    for (const subject of ibClassGrades.subjects) {
      if (userType === END_USER_ENUM.TEACHER && subject.teacher?._id !== userId) continue;

      const subjectCoverage = subject.getDegreesCoverage();

      subjects.push({
        name: subject.name,
        newId: subject.newId,
        isCovered: subjectCoverage === subject.studentIds.length,
        degreesCovered: subjectCoverage,
        totalDegrees: subject.studentIds.length,
        teachers: subject.teacher ? [subject.teacher] : [],
      });
    }

    return {
      canCompleteTerm: userType === END_USER_ENUM.TEACHER ? false : true,
      subjects,
    };
  }
}
