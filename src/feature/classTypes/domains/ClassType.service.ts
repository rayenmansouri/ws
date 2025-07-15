import { BadRequestError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { ClassTypeMetaData, SubjectOfClassType } from "../repo/classType.entity";
import { ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { ClassType } from "../repo/classType.entity";
import { ExamType } from "../../examTypes/domains/examType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";

export class ClassTypeService {
  static reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= array.length || toIndex >= array.length) {
      throw new BadRequestError("Invalid indices");
    }

    const newArray = [...array];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);

    return newArray;
  }

  static isPrimary(classType: { fields: unknown[] }): boolean {
    return classType.fields?.length > 0;
  }

  static checkSubjectIncludedInGradeBook(subject: {
    subSubjects: { exams: unknown[] }[];
    exams: unknown[];
  }): boolean {
    const hasSubSubject = subject.subSubjects.length > 0;
    const hasExam = subject.exams.length > 0;
    const hasAtLeastSubSubjectIncludeInGradeBook = subject.subSubjects.some(subSubject =>
      this.checkSubSubjectIncludedInGradeBook(subSubject),
    );

    if (hasExam) return true;

    if (!hasSubSubject && !hasExam) return false;

    if (hasSubSubject && hasAtLeastSubSubjectIncludeInGradeBook) return true;

    return false;
  }

  static checkSubSubjectIncludedInGradeBook(subSubject: { exams: unknown[] }): boolean {
    const hasExam = subSubject.exams.length > 0;

    return hasExam;
  }

  static checkClassTypesHaveSameLevel(
    classTypes: Pick<Populate<ClassTypeMetaData, "subLevel">, "subLevel">[],
  ): void {
    const levelIds = classTypes.map(classType => classType.subLevel.level._id);

    const uniqueLevelIds = new Set(levelIds);

    if (uniqueLevelIds.size !== 1)
      throw new BadRequestError("classTypeRules.classTypeAndLevelAreNotValid");
  }

  static ensureSubjectTypeIncludeInClassType(
    classType: Pick<ClassType, "subjects">,
    subjectTypeId: ID,
  ): void {
    const isSubjectTypeIncludedInClassType = classType.subjects.some(
      subject => subject.subjectType === subjectTypeId,
    );

    if (!isSubjectTypeIncludedInClassType) {
      throw new BadRequestError("classType.subjectTypeNotIncluded");
    }
  }

  static ensureSubSubjectTypeIncludeInClassType(
    classType: Pick<ClassType, "subjects">,
    subSubjectTypeId: ID,
  ): void {
    const isSubSubjectTypeIncludedInClassType = classType.subjects.some(
      subject =>
        !!subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectTypeId),
    );

    if (!isSubSubjectTypeIncludedInClassType) {
      throw new BadRequestError("classType.subSubjectTypeNotIncluded");
    }
  }

  static ensureNoTeacherAssignedToSubjectTypeInClass(
    subjectTypeId: ID,
    classDoc: Pick<Class, "subjectTeacherMap">,
  ): void {
    const isTeacherAssignedToSubjectType = classDoc.subjectTeacherMap[subjectTypeId];

    if (isTeacherAssignedToSubjectType) {
      throw new BadRequestError("class.teacherAlreadyAssigned");
    }
  }

  static ensureNoTeacherAssignedToSubSubjectTypeInClass(
    subSubjectTypeId: ID,
    classDoc: Pick<Class, "subSubjectTeacherMap">,
  ): void {
    const isTeacherAssignedToSubSubjectType = classDoc.subSubjectTeacherMap[subSubjectTypeId];

    if (isTeacherAssignedToSubSubjectType) {
      throw new BadRequestError("class.teacherAlreadyAssigned");
    }
  }

  static identifyRemovedExamTypeIds(
    oldExams: SubjectOfClassType["exams"],
    newExamTypeIds: ID[],
  ): ID[] {
    const oldExamTypeIds = oldExams.map(exam => exam.examType);

    const removedExamTypeIds = oldExamTypeIds.filter(
      oldExamTypeId => !newExamTypeIds.includes(oldExamTypeId),
    );

    return removedExamTypeIds;
  }

  static identifyAddedExamTypes(
    oldExams: SubjectOfClassType["exams"],
    newExamType: ExamType[],
  ): ExamType[] {
    const oldExamTypeIds = oldExams.map(exam => exam.examType);

    const addedExamTypeIds = newExamType.filter(
      newExamType => !oldExamTypeIds.includes(newExamType._id),
    );

    return addedExamTypeIds;
  }

  static getSubjectTypeIdFromClassTypeBySubSubjectType(
    classType: Pick<ClassType, "subjects">,
    subSubjectType: Pick<SubSubjectType, "_id">,
  ): ID | null {
    const subject = classType.subjects.find(subject =>
      subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectType._id),
    );

    return subject?.subjectType || null;
  }
}
