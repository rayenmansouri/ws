import { injectable } from "inversify";
import { GradesOfFieldDTO } from "../../dto/primary/GradesOfField.dto";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";

@injectable()
export class GetGradesOfFieldUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("PrimaryClassGradesRepo")
    private primaryClassGradesRepo: PrimaryClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    fieldIndex,
    termNewId,
    userType,
    userId,
  }: {
    classNewId: string;
    fieldIndex: number;
    termNewId: string;
    userType: TEndUserEnum;
    userId: ID;
  }): Promise<GradesOfFieldDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === termDoc._id,
    );

    const primaryGradeReport = await this.primaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    if (fieldIndex >= primaryGradeReport.fields.length || fieldIndex < 0)
      throw new NotFoundError("notFound.field");

    const field = primaryGradeReport.fields[fieldIndex];

    if (userType === END_USER_ENUM.TEACHER) {
      const fieldTeachers = field.getTeachers();
      if (!fieldTeachers.some(teacher => teacher._id === userId))
        throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    return {
      fieldName: field.name,
      totalNumberOfStudents: field.studentIds.length,
      highestAverage: field.calculateHighestAverage().format(),
      lowestAverage: field.calculateLowestAverage().format(),
      canEdit: isTermCompleted ? false : true,
      headers: field.subTopics.flatMap(subject => {
        if (subject.subTopics.length > 0)
          return subject.subTopics.map(subSubject => ({
            name: subSubject.name,
            examGradeId: subSubject.examGrades[0].examGradeId,
            coefficient: subSubject.coefficient,
          }));

        return [
          {
            name: subject.name,
            examGradeId: subject.examGrades[0].examGradeId,
            coefficient: subject.coefficient,
          },
        ];
      }),
      studentGrades: classDoc.students.map(student => {
        return {
          student: UserMapper.toUserProfileDTO(student),
          average: field.calculateStudentAverage(student._id).format(),
          teacherObservation: field.findStudentObservation(student._id),
          grades: field.subTopics.reduce((acc, subject) => {
            if (subject.subTopics.length > 0) {
              subject.subTopics.forEach(subSubject => {
                const examGrade = subSubject.examGrades[0];
                acc[examGrade.examGradeId] = examGrade.findStudentGrade(student._id).format();
              });

              return acc;
            }

            const examGrade = subject.examGrades[0];
            acc[examGrade.examGradeId] = examGrade.findStudentGrade(student._id).format();

            return acc;
          }, {} as Record<string, string | null>),
        };
      }),
    };
  }
}
