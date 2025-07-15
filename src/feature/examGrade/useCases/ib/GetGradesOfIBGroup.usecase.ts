import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { GradesOfIBSubjectDTO } from "../../dto/ib/GradesOfIBSubject.dto";

@injectable()
export class GetGradesOfIBGroupUsecase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
  ) {}

  async execute({
    groupNewId,
    termNewId,
    userType,
    userId,
  }: {
    groupNewId: string;
    termNewId: string;
    userType: TEndUserEnum;
    userId: string;
  }): Promise<GradesOfIBSubjectDTO> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["students"],
    });
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER && group.teacher !== userId)
      throw new BadRequestError("classRules.teacherIsNotInClass");

    const groupGrades = await this.ibClassGradesRepo.loadGroupGrades(group._id, term._id);

    return {
      canEdit: true,
      subjectName: group.groupType.name,
      headers: groupGrades.examGrades.map(examGrade => {
        return {
          coefficient: examGrade.coefficient,
          examGradeId: examGrade.examGradeId,
          name: examGrade.examType,
        };
      }),
      highestAverage: groupGrades.calculateHighestAverage(),
      lowestAverage: groupGrades.calculateLowestAverage(),
      totalNumberOfStudents: groupGrades.studentIds.length,
      studentGrades: group.students.map(student => {
        const studentAverage = groupGrades.calculateStudentAverage(student._id);

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: studentAverage.format(),
          teacherObservation: groupGrades.findStudentObservation(student._id),
          investment: groupGrades.findStudentInvestment(student._id),
          grades: groupGrades.examGrades.reduce((acc, examGrade) => {
            acc[examGrade.examGradeId] = examGrade.findStudentGrade(student._id).format();
            return acc;
          }, {} as Record<string, string | null>),
        };
      }),
    };
  }
}
