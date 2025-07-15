import { injectable } from "inversify";
import { ExamFieldListDTO } from "../../dto/primary/FieldsOfClass.dto";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { END_USER_ENUM, TEndUserEnum } from "../../../../constants/globalEnums";
import { ID } from "../../../../types/BaseEntity";

@injectable()
export class GetFieldsOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
  ) {}

  async execute({
    classNewId,
    termNewId,
    userType,
    userId,
  }: {
    classNewId: string;
    termNewId: string;
    userType: TEndUserEnum;
    userId: ID;
  }): Promise<ExamFieldListDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (userType === END_USER_ENUM.TEACHER) {
      const teachersOfClass = [
        ...Object.values(classDoc.subjectTeacherMap),
        ...Object.values(classDoc.subSubjectTeacherMap),
      ];

      const isTeacherOfClass = teachersOfClass.some(teacher => teacher === userId);
      if (!isTeacherOfClass) throw new BadRequestError("classRules.teacherIsNotInClass");
    }

    const classGrades = await this.primaryClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const fields: ExamFieldListDTO["fields"] = [];

    for (let i = 0; i < classGrades.fields.length; i++) {
      const field = classGrades.fields[i];

      if (userType === END_USER_ENUM.TEACHER) {
        const teachersOfField = field.getTeachers();
        const isTeacherOfField = teachersOfField.some(teacher => teacher._id === userId);
        if (!isTeacherOfField) continue;
      }

      fields.push({
        name: field.name,
        newId: i.toString(),
        subjects: field.subTopics.map(subject => {
          const subjectCoverage = subject.getDegreesCoverage();

          return {
            name: subject.name,
            subSubjects: subject.subTopics.map(subSubject => {
              return {
                name: subSubject.name,
              };
            }),
            isCovered: subjectCoverage === classGrades.studentIds.length,
            degreesCovered: subjectCoverage,
            totalDegrees: classGrades.studentIds.length,
          };
        }),
        teachers: field.getTeachers(),
      });
    }

    return {
      canCompleteTerm:
        userType === END_USER_ENUM.TEACHER
          ? false
          : fields.every(field => field.subjects.every(subject => subject.isCovered)),
      fields,
    };
  }
}
