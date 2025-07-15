import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { GradesOfCambridgeSubjectDTO } from "../../dto/cambridge/GradesOfCambridgeSubject.dto";

@injectable()
export class GetGradesOfCambridgeGroupUsecase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
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
  }): Promise<GradesOfCambridgeSubjectDTO> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group", {
      populate: ["students"],
    });
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER && group.teacher !== userId)
      throw new BadRequestError("classRules.teacherIsNotInClass");

    const groupGrades = await this.cambridgeClassGradesRepo.loadGroupGrades(group._id, term._id);

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
      highestAverage: groupGrades.calculateHighestAverage().format(),
      lowestAverage: groupGrades.calculateLowestAverage().format(),
      totalNumberOfStudents: groupGrades.studentIds.length,
      studentGrades: group.students.map(student => {
        const studentAverage = groupGrades.calculateStudentAverage(student._id);

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: studentAverage.format(),
          averageEquivalence: studentAverage.getEquivalence(),
          letterGrade: studentAverage.getLetterGrade(),
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
