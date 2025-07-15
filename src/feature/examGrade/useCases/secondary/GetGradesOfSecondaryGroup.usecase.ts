import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { GradesOfSecondarySubjectDTO } from "../../dto/secondary/GradesOfSecondarySubject.dto";

@injectable()
export class GetGradesOfSecondaryGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
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
    userId: ID;
  }): Promise<GradesOfSecondarySubjectDTO> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER && group.teacher !== userId)
      throw new BadRequestError("groupRules.teacherIsNotInGroup");

    const groupGrades = await this.secondaryClassGradesRepo.loadGroupGrades(group._id, termDoc._id);

    return {
      subjectName: group.groupType.name,
      canEdit: true,
      highestAverage: groupGrades.calculateHighestAverage().format(),
      lowestAverage: groupGrades.calculateLowestAverage().format(),
      hasSubSubjects: false,
      subSubjects: [],
      selectedSubSubject: null,
      totalNumberOfStudents: group.students.length,
      headers: groupGrades.examGrades.map(examGrade => ({
        name: examGrade.examType,
        coefficient: examGrade.coefficient,
        examGradeId: examGrade.examGradeId,
      })),
      studentGrades: group.students.map(student => {
        return {
          student: UserMapper.toUserProfileDTO(student),
          average: groupGrades.calculateStudentAverage(student._id).format(),
          teacherObservation: groupGrades.findStudentObservation(student._id),
          grades: groupGrades.examGrades.reduce((acc, examGrade) => {
            acc[examGrade.examGradeId] = examGrade.findStudentGrade(student._id).format();
            return acc;
          }, {} as Record<string, string | null>),
        };
      }),
    };
  }
}
