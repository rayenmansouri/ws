import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { inject } from "../../../../core/container/TypedContainer";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { SecondarySubjectsOfClassDTO } from "../../dto/secondary/SecondarySubjectsOfClass.dto";

@injectable()
export class GetSecondarySubjectsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
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
    userId: string;
  }): Promise<SecondarySubjectsOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER) {
      const teachersOfClass = [
        ...Object.values(classDoc.subjectTeacherMap),
        ...Object.values(classDoc.subSubjectTeacherMap),
      ];

      const isTeacherOfClass = teachersOfClass.some(teacher => teacher === userId);
      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const classGrades = await this.secondaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subjects: SecondarySubjectsOfClassDTO["subjects"] = [];
    for (const subject of classGrades.subjects) {
      if (userType === END_USER_ENUM.TEACHER) {
        const subjectTeachers = subject.getTeachers();
        const isTeacherOfSubject = subjectTeachers.some(teacher => teacher._id === userId);

        if (!isTeacherOfSubject) continue;
      }

      const subjectCoverage = subject.getDegreesCoverage();

      subjects.push({
        name: subject.name,
        newId: subject.newId,
        isCovered: subjectCoverage === subject.studentIds.length,
        degreesCovered: subjectCoverage,
        totalDegrees: subject.studentIds.length,
        subSubjects: subject.subTopics.map(subSubject => ({
          name: subSubject.name,
        })),
        teachers: subject.getTeachers(),
      });
    }

    const canCompleteTerm = subjects.every(subject => subject.isCovered);

    return {
      canCompleteTerm: userType === END_USER_ENUM.TEACHER ? false : canCompleteTerm,
      subjects,
    };
  }
}
