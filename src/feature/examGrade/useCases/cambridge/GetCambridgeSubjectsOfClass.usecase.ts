import { injectable } from "inversify";
import { CambridgeSubjectOfClassDTO } from "../../dto/cambridge/CambridgeSubjectOfClass.dto";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { BadRequestError } from "../../../../core/ApplicationErrors";

@injectable()
export class GetCambridgeSubjectsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("CambridgeClassGradesRepo")
    private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
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
  }): Promise<CambridgeSubjectOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER) {
      const classTeachers = Object.values(classDoc.subjectTeacherMap);
      const isTeacherOfClass = classTeachers.some(teacher => teacher === userId);

      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const cambridgeClassGrades = await this.cambridgeClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === termDoc._id,
    );

    const subjects: CambridgeSubjectOfClassDTO["subjects"] = [];
    for (const subject of cambridgeClassGrades.subjects) {
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

    const canCompleteTerm = isTermCompleted ? false : subjects.every(subject => subject.isCovered);

    return {
      canCompleteTerm: userType === END_USER_ENUM.TEACHER ? false : canCompleteTerm,
      subjects,
    };
  }
}
