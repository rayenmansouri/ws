import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Class } from "../../../feature/classes/domain/class.entity";
import { TTopicTypeEnum } from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";
import {
  GradeBookObservation,
  GradeBookObservationMetaData,
} from "../../../feature/gradeBookObservation/gradeBookObservation.entity";
import { GradeBookObservationRepo } from "../../../feature/gradeBookObservation/GradeBookObservation.repo";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { InternalError } from "../../../core/ApplicationErrors";

export class MongoGradeBookObservationRepo
  extends MongoBaseRepo<GradeBookObservationMetaData>
  implements GradeBookObservationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "gradeBookObservation", session);
  }

  async findAllByTerm(filter: {
    termId: ID;
    classIds?: ID[];
    groupIds?: ID[];
  }): Promise<GradeBookObservation[]> {
    const query: FilterQuery<GradeBookObservationMetaData> = {
      term: filter.termId,
      $or: [],
    };

    if (filter.classIds) query.$or?.push({ class: { $in: filter.classIds } });
    if (filter.groupIds) query.$or?.push({ topicId: { $in: filter.groupIds } });

    return await this.model.find(query);
  }
  async deleteManyByClassAndTopic(
    classIds: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<void> {
    await this.model.deleteMany({ class: { $in: classIds }, topicId, topicType });
  }

  async addManyByClasses(data: {
    topicId: ID;
    topicType: TTopicTypeEnum;
    termsIds: ID[];
    classDocs: Pick<Class, "_id" | "students">[];
  }): Promise<void> {
    const payload: Omit<GradeBookObservationMetaData["entity"], keyof BaseEntity>[] =
      data.classDocs.flatMap(classDoc => {
        return data.termsIds.flatMap(termId => {
          return {
            topicId: data.topicId,
            topicType: data.topicType,
            term: termId,
            observations: Object.fromEntries(
              classDoc.students.map(student => [student.toString(), null]),
            ),
            ibInvestments: Object.fromEntries(
              classDoc.students.map(student => [student.toString(), null]),
            ),
            class: classDoc._id,
          };
        });
      });
    await this.model.insertMany(payload, { session: this.session });
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }

  async addStudentsToGradeBookObservationOfClass(classId: ID, studentIds: ID[]): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`observations.${studentId}`] = null;
    });

    await this.model.updateMany({ class: classId }, updateObject, { session: this.session });
  }

  async addStudentsToGradeBookObservationOfGroup(groupId: ID, studentIds: ID[]): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$set[`observations.${studentId}`] = null;
    });

    await this.model.updateMany({ topicId: groupId }, updateObject, {
      session: this.session,
    });
  }

  async removeStudentsFromGradeBookObservationOfClass(
    classId: ID,
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $unset: {} as Record<string, unknown>,
    };

    studentIds.forEach(studentId => {
      updateObject.$unset[`observations.${studentId}`] = "";
    });

    await this.model.updateMany({ class: classId }, updateObject, { session: this.session });
  }

  async removeStudentsFromGradeBookObservationOfGroup(
    groupId: ID,
    studentIds: ID[],
  ): Promise<void> {
    const updateObject = {
      $unset: {} as Record<string, "">,
    };

    studentIds.forEach(studentId => {
      updateObject.$unset[`observations.${studentId}`] = "";
    });

    await this.model.updateMany({ topicId: groupId }, updateObject, {
      session: this.session,
    });
  }

  async getGradeBookObservationOfStudent(
    classId: ID,
    studentId: ID,
  ): Promise<GradeBookObservationMetaData["entity"][]> {
    return await this.model.find({
      class: classId,
      [`observations.${studentId}`]: { $exists: true },
    });
  }

  async swapStudentGradeBookObservation(
    studentId: ID,
    newClassId: ID,
    oldGradeBookObservation: GradeBookObservationMetaData["entity"],
  ): Promise<void> {
    await this.model.updateOne(
      {
        topicId: oldGradeBookObservation.topicId,
        topicType: oldGradeBookObservation.topicType,
        term: oldGradeBookObservation.term,
        class: newClassId,
      },
      {
        $set: {
          [`observations.${studentId}`]: oldGradeBookObservation.observations[studentId],
        },
      },
      {
        session: this.session,
      },
    );
  }

  async unsetStudentGradeBookObservation(
    studentId: ID,
    gradeBookObservationIds: ID[],
  ): Promise<void> {
    await this.model.updateMany(
      {
        _id: { $in: gradeBookObservationIds },
      },
      {
        $unset: { [`observations.${studentId}`]: 1 },
      },
      { session: this.session },
    );
  }

  async updateStudentsObservations(
    gradeBookObservationId: ID,
    observations: Record<ID, string | null>,
    investments?: Record<ID, string | null>,
  ): Promise<void> {
    const updateObject = {
      $set: {} as Record<string, unknown>,
    };

    for (const [studentId, observation] of Object.entries(observations)) {
      updateObject.$set[`observations.${studentId}`] = observation;
    }

    if (investments)
      for (const [studentId, investment] of Object.entries(investments)) {
        updateObject.$set[`ibInvestments.${studentId}`] = investment;
      }

    await this.model.updateOne({ _id: gradeBookObservationId }, updateObject, {
      session: this.session,
    });
  }

  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ topicId: groupId });
  }

  async findAdminObservations(
    classId: ID,
    termId: ID,
  ): Promise<GradeBookObservationMetaData["entity"]> {
    const observation = await this.model.findOne({
      class: classId,
      term: termId,
      topicId: null,
      topicType: null,
    });

    if (!observation) throw new InternalError();

    return observation;
  }
}
