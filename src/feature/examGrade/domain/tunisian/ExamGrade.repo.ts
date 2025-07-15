import { BaseRepo } from "../../../../core/BaseRepo";
import { ID } from "../../../../types/BaseEntity";
import { Class } from "../../../classes/domain/class.entity";
import { ExamGrade, ExamGradeDegrees, ExamGradeMetaData, TTopicTypeEnum } from "./ExamGrade.entity";

export abstract class ExamGradeRepo extends BaseRepo<ExamGradeMetaData> {
  abstract findAllExamGradesByTerm(filter: {
    classIds?: ID[];
    groupIds?: ID[];
    termId: ID;
  }): Promise<ExamGrade[]>;

  abstract deleteManyByClass(classId: ID): Promise<void>;
  abstract deleteManyByGroup(groupId: ID): Promise<void>;

  abstract deleteManyBySubSubject(data: {
    classIds: ID[];
    subSubjectTypeId: ID;
    examTypeIds: ID[];
  }): Promise<void>;

  abstract deleteManyByGroupAndExamTypes(data: {
    groupIds: ID[];
    examTypeIds: ID[];
  }): Promise<void>;

  abstract deleteManyBySubject(data: {
    classIds: ID[];
    subjectTypeId: ID;
    examTypeIds: ID[];
  }): Promise<void>;

  abstract addManyByClasses(data: {
    topicId: ID;
    topicType: TTopicTypeEnum;
    termsIds: ID[];
    examTypesIds: ID[];
    classDocs: Pick<Class, "_id" | "students">[];
  }): Promise<void>;

  abstract addManyByGroups(data: {
    groups: { _id: ID; termsIds: ID[]; students: ID[] }[];
    examTypesIds: ID[];
  }): Promise<void>;

  abstract addStudentsToExamGradeOfClass(
    filter: { classId: ID; termIds: ID[] },
    studentIds: ID[],
  ): Promise<void>;

  abstract addStudentsToExamGradeOfGroup(
    filter: { groupId: ID; termId: ID },
    studentIds: ID[],
  ): Promise<void>;

  abstract removeStudentsFromExamGradeOfClass(classId: ID, studentIds: ID[]): Promise<void>;

  abstract removeStudentsFromExamGradeOfGroup(groupId: ID, studentIds: ID[]): Promise<void>;

  abstract markStudentExamDegreeAsDispensedForClass(
    filter: { classId: ID; termIds: ID[] },
    studentIds: ID[],
  ): Promise<void>;

  abstract markStudentExamDegreeAsDispensedForGroup(
    filter: { groupId: ID },
    studentIds: ID[],
  ): Promise<void>;

  abstract getExamGradesOfClass(classId: ID): Promise<ExamGradeMetaData["entity"][]>;

  abstract swapStudentExamGrade(
    studentId: ID,
    newClass: ID,
    oldExamGrade: ExamGradeMetaData["entity"],
  ): Promise<void>;

  abstract unsetStudentDegreeOfExamGrades(studentId: ID, examGradesIds: ID[]): Promise<void>;

  abstract updateStudentsDegrees(examGradeId: ID, degrees: ExamGradeDegrees): Promise<void>;
}
