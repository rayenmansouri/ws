import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { GradesOfCambridgeSubjectDTO } from "../../dto/cambridge/GradesOfCambridgeSubject.dto";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";

@injectable()
export class GetGradesOfCambridgeSubjectUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
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
  }): Promise<GradesOfCambridgeSubjectDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const isTermCompleted = classDoc.gradeReports.some(report => report.term === termDoc._id);

    const cambridgeClassGrades = await this.cambridgeClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subject = cambridgeClassGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    if (userType === END_USER_ENUM.TEACHER) {
      const isTeacherOfSubject = subject.teacher?._id === userId;
      if (!isTeacherOfSubject) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    return {
      subjectName: subject.name,
      canEdit: isTermCompleted ? false : true,
      totalNumberOfStudents: subject.studentIds.length,
      highestAverage: subject.calculateHighestAverage().format(),
      lowestAverage: subject.calculateLowestAverage().format(),
      headers: subject.examGrades.map(exam => ({
        name: exam.examType,
        examGradeId: exam.examGradeId,
        coefficient: exam.coefficient,
      })),
      studentGrades: classDoc.students.map(student => {
        const studentGrades = subject.examGrades.reduce((acc, exam) => {
          acc[exam.examGradeId] = exam.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>);

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: subject.calculateStudentAverage(student._id).format(),
          averageEquivalence: subject.calculateStudentAverage(student._id).getEquivalence(),
          letterGrade: subject.calculateStudentAverage(student._id).getLetterGrade(),
          teacherObservation: subject.findStudentObservation(student._id),
          grades: studentGrades,
        };
      }),
    };
  }
}
