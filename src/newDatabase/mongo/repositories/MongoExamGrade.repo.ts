import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Class } from "../../../feature/classes/domain/class.entity";
import {
  DISPENSED_STATUS,
  ExamGrade,
  ExamGradeDegrees,
  ExamGradeMetaData,
  TDispensedStatus,
  TOPIC_TYPE_ENUM,
  TTopicTypeEnum,
} from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../../feature/examGrade/domain/tunisian/ExamGrade.repo";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

@injectable()
export class MongoExamGradeRepo extends MongoBaseRepo<ExamGradeMetaData> implements ExamGradeRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "examGrade", session);
  }

  async deleteManyBySubSubject(data: {
    classIds: ID[];
    subSubjectTypeId: ID;
    examTypeIds: ID[];
  }): Promise<void> {
    const filterQuery: FilterQuery<ExamGrade> = {
      class: { $in: data.classIds },
      examType: { $in: data.examTypeIds },
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      topicId: data.subSubjectTypeId,
    };

    await this.model.deleteMany(filterQuery, { session: this.session });
  }
  async deleteManyByGroupAndExamTypes(data: { groupIds: ID[]; examTypeIds: ID[] }): Promise<void> {
    const filterQuery: FilterQuery<ExamGrade> = {
      topicId: { $in: data.groupIds },
      examType: { $in: data.examTypeIds },
      topicType: TOPIC_TYPE_ENUM.GROUP,
    };

    await this.model.deleteMany(filterQuery, { session: this.session });
  }
  async deleteManyBySubject(data: {
    classIds: ID[];
    subjectTypeId: ID;
    examTypeIds: ID[];
  }): Promise<void> {
    const filterQuery: FilterQuery<ExamGrade> = {
      class: { $in: data.classIds },
      examType: { $in: data.examTypeIds },
      topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
      topicId: data.subjectTypeId,
    };

    await this.model.deleteMany(filterQuery, { session: this.session });
  }

  async addManyByGroups(data: {
    groups: { _id: ID; termsIds: ID[]; students: ID[] }[];
    examTypesIds: ID[];
  }): Promise<void> {
    const payload: Omit<ExamGrade, keyof BaseEntity>[] = data.groups.flatMap(group => {
      return group.termsIds.flatMap(termId => {
        return data.examTypesIds.map(examTypeId => ({
          topicId: group._id,
          topicType: TOPIC_TYPE_ENUM.GROUP,
          term: termId,
          examType: examTypeId,
          degrees: Object.fromEntries(group.students.map(student => [student.toString(), null])),
          class: null,
        }));
      });
    });

    await this.model.insertMany(payload, { session: this.session });
  }

  async addManyByClasses(data: {
    topicId: ID;
    topicType: TTopicTypeEnum;
    termsIds: ID[];
    examTypesIds: ID[];
    classDocs: Pick<Class, "_id" | "students">[];
  }): Promise<void> {
    const payload: Omit<ExamGradeMetaData["entity"], keyof BaseEntity>[] = data.classDocs.flatMap(
      classDoc => {
        return data.termsIds.flatMap(termId => {
          return data.examTypesIds.map(examTypeId => ({
            topicId: data.topicId,
            topicType: data.topicType,
            term: termId,
            examType: examTypeId,
            degrees: Object.fromEntries(
              classDoc.students.map(student => [student.toString(), null]),
            ),
            class: classDoc._id,
          }));
        });
      },
    );

    await this.model.insertMany(payload, { session: this.session });
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }

  async addStudentsToExamGradeOfClass(
    filter: { classId: ID; termIds: ID[] },
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`degrees.${studentId}`] = null;
    });

    await this.model.updateMany(
      { class: filter.classId, term: { $in: filter.termIds } },
      updateObject,
      { session: this.session || undefined },
    );
  }

  async addStudentsToExamGradeOfGroup(
    filter: { groupId: ID; termId: ID },
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, null>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`degrees.${studentId}`] = null;
    });

    await this.model.updateMany({ topicId: filter.groupId, term: filter.termId }, updateObject, {
      session: this.session || undefined,
    });
  }

  async removeStudentsFromExamGradeOfClass(classId: ID, studentIds: ID[]): Promise<void> {
    const updateObject = {
      $unset: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$unset[`degrees.${studentId}`] = "";
    });

    await this.model.updateMany({ class: classId }, updateObject, {
      session: this.session || undefined,
    });
  }

  async removeStudentsFromExamGradeOfGroup(groupId: ID, studentIds: ID[]): Promise<void> {
    const updateObject = {
      $unset: {} as Record<string, "">,
    };

    studentIds.forEach(studentId => {
      updateObject.$unset[`degrees.${studentId}`] = "";
    });

    await this.model.updateMany({ topicId: groupId }, updateObject, {
      session: this.session || undefined,
    });
  }

  async markStudentExamDegreeAsDispensedForClass(
    filter: { classId: ID; termIds: ID[] },
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`degrees.${studentId}`] = DISPENSED_STATUS;
    });

    await this.model.updateMany(
      { class: filter.classId, term: { $in: filter.termIds } },
      updateObject,
      { session: this.session || undefined },
    );
  }

  async markStudentExamDegreeAsDispensedForGroup(
    filter: { groupId: ID },
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, TDispensedStatus>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`degrees.${studentId}`] = DISPENSED_STATUS;
    });

    await this.model.updateMany({ topicId: filter.groupId }, updateObject, {
      session: this.session || undefined,
    });
  }

  async findAllExamGradesByTerm(filter: {
    classIds?: ID[];
    groupIds?: ID[];
    termId: ID;
  }): Promise<ExamGrade[]> {
    const filterQuery: FilterQuery<ExamGrade> = { term: filter.termId, $or: [] };

    if (filter.classIds) filterQuery.$or?.push({ class: { $in: filter.classIds } });
    if (filter.groupIds) filterQuery.$or?.push({ topicId: { $in: filter.groupIds } });

    const examGrades = await this.model.find(filterQuery);

    return examGrades;
  }

  async getExamGradesOfClass(classId: ID): Promise<ExamGrade[]> {
    return (await this.model.find({ class: classId })) as unknown as ExamGrade[];
  }

  async swapStudentExamGrade(
    studentId: ID,
    newClassId: ID,
    oldExamGrade: ExamGradeMetaData["entity"],
  ): Promise<void> {
    await this.model.updateOne(
      {
        topicId: oldExamGrade.topicId,
        topicType: oldExamGrade.topicType,
        term: oldExamGrade.term,
        examType: oldExamGrade.examType,
        class: newClassId,
      },
      {
        $set: {
          [`degrees.${studentId}`]: oldExamGrade.degrees[studentId],
        },
      },
      {
        session: this.session,
      },
    );
  }

  async unsetStudentDegreeOfExamGrades(studentId: ID, examGradesIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: examGradesIds } },
      {
        $unset: { [`degrees.${studentId}`]: 1 },
      },
      {
        session: this.session,
      },
    );
  }

  async updateStudentsDegrees(examGradeId: ID, degrees: ExamGradeDegrees): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    for (const [studentId, degree] of Object.entries(degrees)) {
      updateObject.$set[`degrees.${studentId}`] = degree;
    }

    await this.model.updateOne({ _id: examGradeId }, updateObject, {
      session: this.session,
    });
  }

  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ topicId: groupId });
  }
}
