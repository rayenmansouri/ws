import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { GradesOfSecondarySubjectDTO } from "../../dto/secondary/GradesOfSecondarySubject.dto";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { inject } from "../../../../core/container/TypedContainer";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { GradingEntity } from "../../domain/tunisian/Grading.entity";

@injectable()
export class GetGradesOfSecondarySubjectUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    subjectNewId,
    subSubjectNewId,
    userType,
    userId,
  }: {
    classNewId: string;
    termNewId: string;
    subjectNewId: string;
    subSubjectNewId?: string;
    userType: TEndUserEnum;
    userId: string;
  }): Promise<GradesOfSecondarySubjectDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const classGrades = await this.secondaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const subject = classGrades.subjects.find(subject => subject.newId === subjectNewId);
    if (!subject) throw new NotFoundError("notFound.subject");

    if (userType === END_USER_ENUM.TEACHER) {
      const subjectTeachers = subject.getTeachers();
      const isTeacherOfSubject = subjectTeachers.some(teacher => teacher._id === userId);
      if (!isTeacherOfSubject) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    let gradingEntity: GradingEntity = subject;
    if (subject.subTopics.length > 0) {
      gradingEntity = subject.subTopics[0];

      if (subSubjectNewId) {
        const subSubject = subject.subTopics.find(subTopic => subTopic.newId === subSubjectNewId);
        if (!subSubject) throw new NotFoundError("notFound.subSubject");
        gradingEntity = subSubject;
      }
    }

    const isTermCompleted = classDoc.gradeReports.some(report => report.term === termDoc._id);

    return {
      subjectName: subject.name,
      totalNumberOfStudents: subject.studentIds.length,
      highestAverage: subject.calculateHighestAverage().format(),
      lowestAverage: subject.calculateLowestAverage().format(),
      canEdit: isTermCompleted ? false : true,
      hasSubSubjects: subject.subTopics.length > 0,
      subSubjects: subject.subTopics.map(subTopic => ({
        name: subTopic.name,
        newId: subTopic.newId,
      })),
      selectedSubSubject: {
        name: gradingEntity.name,
        newId: gradingEntity.newId,
      },
      headers: gradingEntity.examGrades.map(examGrade => ({
        name: examGrade.examType,
        examGradeId: examGrade.examGradeId,
        coefficient: examGrade.coefficient,
      })),
      studentGrades: classDoc.students.map(student => {
        const studentGrades = gradingEntity.examGrades.reduce((acc, examGrade) => {
          acc[examGrade.examGradeId] = examGrade.findStudentGrade(student._id).format();
          return acc;
        }, {} as Record<string, string | null>);

        return {
          student: UserMapper.toUserProfileDTO(student),
          average: gradingEntity.calculateStudentAverage(student._id).format(),
          teacherObservation: gradingEntity.findStudentObservation(student._id),
          grades: studentGrades,
        };
      }),
    };
  }
}
