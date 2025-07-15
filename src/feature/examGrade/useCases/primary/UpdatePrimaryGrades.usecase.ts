import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { DISPENSED_STATUS, ExamGradeDegrees } from "../../domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../domain/tunisian/ExamGrade.repo";
import { Grade } from "../../domain/tunisian/Grade.valueobject";
import { GradingEntity } from "../../domain/tunisian/Grading.entity";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";

@injectable()
export class UpdatePrimaryGradesUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    fieldIndex,
    grades,
    observations,
    userType,
    userId,
  }: {
    classNewId: string;
    termNewId: string;
    fieldIndex: number;
    grades: Record<string, Record<string, string | null>>;
    observations: Record<string, string>;
    userType: TUserTypeEnum;
    userId: string;
  }): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === termDoc._id,
    );
    if (isTermCompleted) throw new BadRequestError("term.isCompleted");

    const classGrades = await this.primaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    if (fieldIndex < 0 || fieldIndex >= classGrades.fields.length)
      throw new NotFoundError("notFound.field");

    const field = classGrades.fields[fieldIndex];

    for (const [examGradeId, studentGrades] of Object.entries(grades)) {
      let gradingEntity: GradingEntity | null = null;
      for (const subject of field.subTopics) {
        if (subject.subTopics.length === 0 && subject.examGrades[0].examGradeId === examGradeId) {
          gradingEntity = subject;
          break;
        }

        for (const subSubject of subject.subTopics) {
          if (subSubject.examGrades[0].examGradeId === examGradeId) {
            gradingEntity = subSubject;
            break;
          }
        }
      }

      if (!gradingEntity) throw new BadRequestError("invalid.examGrade");

      if (userType === END_USER_ENUM.TEACHER && gradingEntity.teacher?._id !== userId)
        throw new BadRequestError("teacher.notAssignedToSubject");

      const examGradePayload: ExamGradeDegrees = {};
      for (const [studentId, studentGrade] of Object.entries(studentGrades)) {
        if (!classDoc.students.includes(studentId as ID))
          throw new BadRequestError("notFound.student");

        const grade = Grade.create(1, studentGrade);
        if (grade.isDispensed) examGradePayload[studentId as ID] = DISPENSED_STATUS;
        else examGradePayload[studentId as ID] = grade.mark;
      }

      await this.examGradeRepo.updateStudentsDegrees(examGradeId as ID, examGradePayload);
    }

    for (const [studentId, _] of Object.entries(observations)) {
      if (!classDoc.students.includes(studentId as ID))
        throw new BadRequestError("notFound.student");
    }

    await this.gradeBookObservationRepo.updateStudentsObservations(
      field.gradeBookObservationId as ID,
      observations,
    );
  }
}
