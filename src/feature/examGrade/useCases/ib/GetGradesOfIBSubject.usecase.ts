import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { GradesOfIBSubjectDTO } from "../../dto/ib/GradesOfIBSubject.dto";

@injectable()
export class GetGradesOfIBSubjectUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    subjectNewId,
    termNewId,
    userType,
    userId,
  }: {
    classNewId: string;
    subjectNewId: string;
    termNewId: string;
    userType: TEndUserEnum;
    userId: ID;
  }): Promise<GradesOfIBSubjectDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const isTermCompleted = classDoc.gradeReports.some(report => report.term === termDoc._id);

    const ibClassGrades = await this.ibClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subject = ibClassGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    if (userType === END_USER_ENUM.TEACHER) {
      const isTeacherOfSubject = subject.teacher?._id === userId;
      if (!isTeacherOfSubject) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    return {
      subjectName: subject.name,
      canEdit: isTermCompleted ? false : true,
      totalNumberOfStudents: subject.studentIds.length,
      headers: subject.examGrades.map(exam => ({
        name: exam.examType,
        examGradeId: exam.examGradeId,
        coefficient: exam.coefficient,
      })),
      highestAverage: subject.calculateHighestAverage(),
      lowestAverage: subject.calculateLowestAverage(),
      studentGrades: classDoc.students.map(student => {
        const studentGrades = subject.examGrades.reduce((acc, exam) => {
          acc[exam.examGradeId] = exam.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>);

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: subject.calculateStudentAverage(student._id).format(),
          teacherObservation: subject.findStudentObservation(student._id),
          investment: subject.findStudentInvestment(student._id),
          grades: studentGrades,
        };
      }),
    };
  }
}
