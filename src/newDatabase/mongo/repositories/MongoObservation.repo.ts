import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { Admin } from "../../../feature/admins/domain/admin.entity";
import {
  Observation,
  ObservationMetaData,
} from "../../../feature/observations/domain/observation.entity";
import {
  classObservation,
  ObservationRepo,
} from "../../../feature/observations/domain/Observation.repo";
import { SessionMetaData } from "../../../feature/sessionManagement/domain/session.entity";
import { Teacher } from "../../../feature/teachers/domain/teacher.entity";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoObservationRepo
  extends MongoBaseRepo<ObservationMetaData>
  implements ObservationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "observation", session);
  }

  async removeSession(sessionId: ID): Promise<void> {
    await this.model.updateMany({ session: sessionId }, { session: null });
  }

  async findManyByObservationReason(observationReasonId: ID): Promise<Observation[]> {
    return await this.model.find({ "observationReason._id": observationReasonId }).lean();
  }

  async updateManyByObservationReason(
    observationReasonId: string,
    data: Partial<Observation>,
  ): Promise<void> {
    await this.model.updateMany({ "observationReason._id": observationReasonId }, data);
  }

  async list<FieldsToPopulate extends keyof ObservationMetaData["populatedFields"] = never>(
    filter: {
      classId?: ID;
      groupIds?: ID[];
      studentId?: ID;
      teacherIds?: ID[];
      observationReasonId?: ID;
      search?: string;
      excludeEmptyFiles?: boolean;
      subjectTypeIds?: ID[];
    },
    options: ListOptions & { populate?: FieldsToPopulate[] },
  ): Promise<ResponseWithPagination<Populate<ObservationMetaData, FieldsToPopulate>>> {
    const {
      classId,
      groupIds,
      studentId,
      teacherIds,
      observationReasonId,
      search,
      excludeEmptyFiles,
      subjectTypeIds,
    } = filter;

    const filterQuery: FilterQuery<Observation> = {};

    if (classId || groupIds) {
      filterQuery.$or = [];

      if (classId && classId.length > 0) filterQuery.$or.push({ class: classId });

      if (groupIds && groupIds.length > 0) filterQuery.$or.push({ group: { $in: groupIds } });
    }

    if (classId && classId.length > 0) filterQuery.$or?.push({ class: classId });

    if (groupIds && groupIds.length > 0) filterQuery.$or?.push({ group: { $in: groupIds } });

    if (excludeEmptyFiles === true) filterQuery.files = { $exists: true, $ne: [] };

    if (search) filterQuery["files.name"] = { $regex: search, $options: "i" };

    if (studentId && studentId.length > 0) filterQuery.students = { $in: studentId };

    if (teacherIds && teacherIds.length > 0) filterQuery.issuer = { $in: teacherIds };

    if (subjectTypeIds && subjectTypeIds.length > 0)
      filterQuery.subjectType = { $in: subjectTypeIds };

    if (observationReasonId) filterQuery["observationReason._id"] = observationReasonId;

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: options.populate,
    });

    return data;
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }

  async findManyBySessionId(
    sessionId: ID,
  ): Promise<Populate<ObservationMetaData, "issuer" | "students">[]> {
    return await this.model
      .find({ session: sessionId })
      .session(this.session)
      .populate("issuer students");
  }

  async getObservationsByClassInRange(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<classObservation[]> {
    const timeQuery: { $gte?: Date; $lte?: Date } = {};
    if (dateInterval) {
      if (dateInterval.from) {
        timeQuery.$gte = dateInterval.from;
      }

      if (dateInterval.to) {
        timeQuery.$lte = dateInterval.to;
      }
    }

    const data = (await this.model
      .find({
        class: { $in: stringsToObjectIds(classesIds) },
        ...(dateInterval ? { issueDate: timeQuery } : {}),
      })
      .populate({
        path: "students issuer session group class",
        populate: { path: "subjectType subSubjectType" },
      })) as unknown as (Omit<
      Populate<ObservationMetaData, "issuer" | "students" | "group" | "class">,
      "session"
    > & {
      session: Populate<SessionMetaData, "subSubjectType" | "subjectType"> | null;
    })[];

    const observations: classObservation[] = data.map(observation => {
      return {
        issuer: observation.issuer as Teacher | Admin,
        _id: observation._id,
        newId: observation.newId,
        students: observation.students,
        topicName:
          observation.session?.subjectType?.name ||
          observation.session?.subSubjectType?.name ||
          observation.group?.groupType?.name ||
          null,
        urgency: observation.observationReason.urgency,
        reason: observation.observationReason.name,
      };
    });
    return observations;
  }

  async getObservationsUrgencyStatsOfClasses(
    classesIds: ID[],
    dateInterval?: { from?: Date; to?: Date },
  ): Promise<{ tag: string; percentage: number }[]> {
    const timeQuery: { $gte?: Date; $lte?: Date } = {};
    if (dateInterval) {
      if (dateInterval.from) {
        timeQuery.$gte = dateInterval.from;
      }

      if (dateInterval.to) {
        timeQuery.$lte = dateInterval.to;
      }
    }

    const result = await this.model.aggregate<
      { chartData: { tag: string; percentage: number }[] } | undefined
    >([
      {
        $match: {
          class: { $in: stringsToObjectIds(classesIds) },
          ...(dateInterval ? { issueDate: timeQuery } : {}),
        },
      },
      {
        $group: {
          _id: "$observationReason.urgency",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          urgencies: {
            $push: {
              urgency: "$_id",
              count: "$count",
            },
          },
          total: { $sum: "$count" },
        },
      },
      {
        $unwind: "$urgencies",
      },
      {
        $project: {
          _id: 0,
          tag: "$urgencies.urgency",
          percentage: {
            $multiply: [{ $divide: ["$urgencies.count", "$total"] }, 100],
          },
        },
      },
      {
        $group: {
          _id: null,
          chartData: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          chartData: 1,
        },
      },
    ]);
    return result[0]?.chartData || [];
  }

  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ group: groupId });
  }
}
