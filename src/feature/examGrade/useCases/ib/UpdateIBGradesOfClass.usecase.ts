import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBGrade } from "../../domain/ib/IBGrade.valueobject";
import { DISPENSED_STATUS, ExamGradeDegrees } from "../../domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../domain/tunisian/ExamGrade.repo";

@injectable()
export class UpdateIBGradesOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    subjectNewId,
    grades,
    observations,
    investments,
    userType,
    userId,
  }: {
    classNewId: string;
    termNewId: string;
    subjectNewId: string;
    grades: Record<string, Record<string, string | null>>;
    observations: Record<string, string>;
    investments: Record<string, string>;
    userType: TUserTypeEnum;
    userId: string;
  }): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === termDoc._id,
    );
    if (isTermCompleted) throw new BadRequestError("term.isCompleted");

    const classGrades = await this.ibClassGradesRepo.loadTermClassGrades(classDoc._id, termDoc._id);

    const subject = classGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    if (userType === END_USER_ENUM.TEACHER && subject.teacher?._id !== userId)
      throw new BadRequestError("teacher.notAssignedToSubject");

    for (const [examGradeId, studentGrades] of Object.entries(grades)) {
      const examGrade = subject.examGrades.find(examGrade => examGrade.examGradeId === examGradeId);
      if (!examGrade) throw new NotFoundError("invalid.examGrade");

      const examGradePayload: ExamGradeDegrees = {};
      for (const [studentId, studentGrade] of Object.entries(studentGrades)) {
        if (!classDoc.students.includes(studentId as ID))
          throw new BadRequestError("notFound.student");

        const grade = IBGrade.create(studentGrade);
        if (grade.isDispensed) examGradePayload[studentId as ID] = DISPENSED_STATUS;
        else examGradePayload[studentId as ID] = grade.mark;
      }

      await this.examGradeRepo.updateStudentsDegrees(examGradeId as ID, examGradePayload);
    }

    for (const [studentId, _] of Object.entries(observations)) {
      if (!classDoc.students.includes(studentId as ID))
        throw new BadRequestError("notFound.student");
    }

    for (const [studentId, _] of Object.entries(investments)) {
      if (!classDoc.students.includes(studentId as ID))
        throw new BadRequestError("notFound.student");
    }

    await this.gradeBookObservationRepo.updateStudentsObservations(
      subject.gradeBookObservationId,
      observations,
      investments,
    );
  }
}
