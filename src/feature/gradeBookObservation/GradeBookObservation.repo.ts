import { BaseRepo } from "../../core/BaseRepo";
import { TTopicTypeEnum } from "../examGrade/domain/tunisian/ExamGrade.entity";
import { ID } from "../../types/BaseEntity";
import { Class } from "../classes/domain/class.entity";
import { GradeBookObservation, GradeBookObservationMetaData } from "./gradeBookObservation.entity";

export abstract class GradeBookObservationRepo extends BaseRepo<GradeBookObservationMetaData> {
  abstract findAllByTerm(filter: {
    termId: ID;
    classIds?: ID[];
    groupIds?: ID[];
  }): Promise<GradeBookObservation[]>;

  abstract deleteManyByClass(classId: ID): Promise<void>;

  abstract deleteManyByGroup(classId: ID): Promise<void>;

  abstract deleteManyByClassAndTopic(
    classIds: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<void>;

  abstract addManyByClasses(data: {
    topicId: ID;
    topicType: TTopicTypeEnum;
    termsIds: ID[];
    classDocs: Pick<Class, "_id" | "students">[];
  }): Promise<void>;

  abstract addStudentsToGradeBookObservationOfClass(classId: ID, studentIds: ID[]): Promise<void>;

  abstract addStudentsToGradeBookObservationOfGroup(groupId: ID, studentIds: ID[]): Promise<void>;

  abstract removeStudentsFromGradeBookObservationOfClass(
    classId: ID,
    studentIds: ID[],
  ): Promise<void>;

  abstract removeStudentsFromGradeBookObservationOfGroup(
    groupId: ID,
    studentIds: ID[],
  ): Promise<void>;

  abstract swapStudentGradeBookObservation(
    studentId: ID,
    newClassId: ID,
    oldGradeBookObservation: GradeBookObservationMetaData["entity"],
  ): Promise<void>;

  abstract getGradeBookObservationOfStudent(
    classId: ID,
    studentId: ID,
  ): Promise<GradeBookObservationMetaData["entity"][]>;

  abstract unsetStudentGradeBookObservation(
    studentId: ID,
    gradeBookObservationIds: ID[],
  ): Promise<void>;

  abstract updateStudentsObservations(
    gradeBookObservationId: ID,
    observations: Record<ID, string | null>,
    investments?: Record<ID, string | null>,
  ): Promise<void>;

  abstract findAdminObservations(classId: ID, termId: ID): Promise<GradeBookObservation>;
}
