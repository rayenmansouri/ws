import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { GroupService } from "../../../groupManagement/domains/Group.service";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { DISPENSED_STATUS, ExamGradeDegrees } from "../../domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../domain/tunisian/ExamGrade.repo";
import { Grade } from "../../domain/tunisian/Grade.valueobject";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";

@injectable()
export class UpdateSecondaryGradesOfGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute({
    groupNewId,
    termNewId,
    grades,
    observations,
    userType,
    userId,
  }: {
    groupNewId: string;
    termNewId: string;
    grades: Record<string, Record<string, string | null>>;
    observations: Record<string, string>;
    userType: TUserTypeEnum;
    userId: ID;
  }): Promise<void> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER && group.teacher !== userId)
      throw new BadRequestError("teacher.notAssignedToSubject");

    const groupGrades = await this.secondaryClassGradesRepo.loadGroupGrades(group._id, term._id);

    for (const [examGradeId, studentGrades] of Object.entries(grades)) {
      const examGrade = groupGrades.examGrades.find(
        examGrade => examGrade.examGradeId === examGradeId,
      );
      if (!examGrade) throw new NotFoundError("invalid.examGrade");

      const examGradePayload: ExamGradeDegrees = {};
      for (const [studentId, studentGrade] of Object.entries(studentGrades)) {
        if (!group.students.includes(studentId as ID))
          throw new BadRequestError("notFound.student");

        const coefficient = GroupService.getGroupTypeCoefficient(group);
        const grade = Grade.create(coefficient, studentGrade);
        if (grade.isDispensed) examGradePayload[studentId as ID] = DISPENSED_STATUS;
        else examGradePayload[studentId as ID] = grade.mark;
      }

      await this.examGradeRepo.updateStudentsDegrees(examGradeId as ID, examGradePayload);
    }

    for (const [studentId] of Object.entries(observations)) {
      if (!group.students.includes(studentId as ID)) throw new BadRequestError("notFound.student");
    }

    await this.gradeBookObservationRepo.updateStudentsObservations(
      groupGrades.gradeBookObservationId as ID,
      observations,
    );
  }
}
