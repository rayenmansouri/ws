import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBGrade } from "../../domain/ib/IBGrade.valueobject";
import { DISPENSED_STATUS, ExamGradeDegrees } from "../../domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../domain/tunisian/ExamGrade.repo";

@injectable()
export class UpdateIBGradesOfGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute({
    groupNewId,
    termNewId,
    grades,
    observations,
    investments,
    userType,
    userId,
  }: {
    groupNewId: string;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    observations: Record<string, string>;
    investments: Record<string, string>;
    userType: TUserTypeEnum;
    userId: ID;
  }): Promise<void> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER && group.teacher !== userId)
      throw new BadRequestError("teacher.notAssignedToSubject");

    const groupGrades = await this.ibClassGradesRepo.loadGroupGrades(group._id, term._id);

    for (const [examGradeId, studentGrades] of Object.entries(grades)) {
      const examGrade = groupGrades.examGrades.find(
        examGrade => examGrade.examGradeId === examGradeId,
      );
      if (!examGrade) throw new NotFoundError("invalid.examGrade");

      const examGradePayload: ExamGradeDegrees = {};
      for (const [studentId, studentGrade] of Object.entries(studentGrades)) {
        if (!group.students.includes(studentId as ID))
          throw new BadRequestError("notFound.student");

        const grade = IBGrade.create(studentGrade);
        if (grade.isDispensed) examGradePayload[studentId as ID] = DISPENSED_STATUS;
        else examGradePayload[studentId as ID] = grade.mark;
      }

      await this.examGradeRepo.updateStudentsDegrees(examGradeId as ID, examGradePayload);
    }

    for (const [studentId] of Object.entries(observations)) {
      if (!group.students.includes(studentId as ID)) throw new BadRequestError("notFound.student");
    }

    for (const [studentId] of Object.entries(investments)) {
      if (!group.students.includes(studentId as ID)) throw new BadRequestError("notFound.student");
    }

    await this.gradeBookObservationRepo.updateStudentsObservations(
      groupGrades.gradeBookObservationId,
      observations,
      investments,
    );
  }
}
