import { Populate } from "../../../core/populateTypes";
import {
  ClassTypeDto,
  FieldOfClassTypeDTO,
  SubjectOfClassTypeDTO,
  SubSubjectOfClassTypeDTO,
} from "../dtos/classType.dto";
import { ClassType, ClassTypeMetaData } from "../repo/classType.entity";

type ToSubjectOfClassTypeDTO = Pick<
  Populate<ClassTypeMetaData, "subjects.subSubjects.subSubjectType" | "subjects.subjectType">,
  "subjects"
>["subjects"][0] & { rank: number };

export class ClassTypeMapper {
  static toClassTypeDto(
    classType: Pick<
      Populate<ClassTypeMetaData, "subLevel">,
      "subLevel" | "name" | "capacity" | "newId" | "isTerminal" | "_id"
    > & { nextClassTypes: Pick<ClassType, "name" | "newId">[] | null },
  ): ClassTypeDto {
    return {
      _id: classType._id,
      newId: classType.newId,
      name: classType.name,
      capacity: classType.capacity,
      level: { name: classType.subLevel.level.name, newId: classType.subLevel.level.newId },
      subLevel: { name: classType.subLevel.name, newId: classType.subLevel.newId },
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
      hasSubSubjects,
      subSubjects: subject.subSubjects.map((subSubject, i) =>
        this.toSubSubjectOfClassTypeDTO(subSubject, i),
      ),
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
      name: subSubject.subSubjectType.name,
      coefficient: subSubject.coefficient,
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
