import { Populate } from "../../../core/populateTypes";
import { ClassTypeService } from "../domains/ClassType.service";
import { ClassTypeDto, FieldOfClassTypeDTO } from "../dtos/classType.dto";
import { ExamDTO, SubjectOfClassTypeDTO, SubSubjectOfClassTypeDTO } from "../dtos/classType.dto";
import { ClassType, ClassTypeMetaData } from "../repo/classType.entity";

type ToSubjectOfClassTypeDTO = Pick<
  Populate<
    ClassTypeMetaData,
    | "subjects.exams.examType"
    | "subjects.subSubjects.exams.examType"
    | "subjects.subSubjects.subSubjectType"
    | "subjects.subjectType"
  >,
  "subjects"
>["subjects"][0] & { rank: number };

export class ClassTypeMapper {
  static toClassTypeDto(
    classType: Pick<
      Populate<ClassTypeMetaData, "subLevel" | "section">,
      "subLevel" | "section" | "name" | "capacity" | "newId" | "isTerminal" | "_id"
    > & { nextClassTypes: Pick<ClassType, "name" | "newId">[] | null },
  ): ClassTypeDto {
    return {
      _id: classType._id,
      newId: classType.newId,
      name: classType.name,
      capacity: classType.capacity,
      level: { name: classType.subLevel.level.name, newId: classType.subLevel.level.newId },
      subLevel: { name: classType.subLevel.name, newId: classType.subLevel.newId },
      section: classType.section
        ? { name: classType.section.name, newId: classType.section.newId }
        : null,
      isTerminal: classType.isTerminal,
      nextClassTypes:
        classType.nextClassTypes?.map(nextClassType => ({
          name: nextClassType.name,
          newId: nextClassType.newId,
        })) || null,
    };
  }

  static toSubjectOfClassTypeDTO(subject: ToSubjectOfClassTypeDTO): SubjectOfClassTypeDTO {
    const hasSubSubjects = subject.subSubjects.length > 0;
    return {
      subjectType: {
        name: subject.subjectType.name,
        _id: subject.subjectType._id,
        newId: subject.subjectType.newId,
      },
      rank: subject.rank,
      coefficient: subject.coefficient,
      isIncludedInGradeBook: ClassTypeService.checkSubjectIncludedInGradeBook(subject),
      hasSubSubjects,
      subSubjects: subject.subSubjects.map((subSubject, i) =>
        this.toSubSubjectOfClassTypeDTO(subSubject, i),
      ),
      exams: subject.exams.map(exam => this.toExamDTO(exam)),
    };
  }

  private static toSubSubjectOfClassTypeDTO(
    subSubject: ToSubjectOfClassTypeDTO["subSubjects"][0],
    rank: number,
  ): SubSubjectOfClassTypeDTO {
    return {
      subSubjectType: {
        _id: subSubject.subSubjectType._id,
        newId: subSubject.subSubjectType.newId,
        name: subSubject.subSubjectType.name,
      },
      rank,
      isIncludedInGradeBook: ClassTypeService.checkSubSubjectIncludedInGradeBook(subSubject),
      name: subSubject.subSubjectType.name,
      coefficient: subSubject.coefficient,
      exams: subSubject.exams.map(exam => this.toExamDTO(exam)),
    };
  }

  private static toExamDTO(
    exam: Populate<ClassTypeMetaData, "subjects.exams.examType">["subjects"][0]["exams"][0],
  ): ExamDTO {
    return {
      name: exam.examType.name,
      examTypeNewId: exam.examType.newId,
      coefficient: exam.coefficient,
    };
  }

  public static toFieldsOfClassTypeDTO(
    field: Populate<ClassTypeMetaData, "fields.subjects">["fields"][0],
    rank: number,
  ): FieldOfClassTypeDTO {
    return {
      name: field.name,
      subjects: field.subjects.map(subject => ({
        name: subject.name,
        newId: subject.newId,
        _id: subject._id,
      })),
      coefficient: field.coefficient,
      rank,
    };
  }
}
