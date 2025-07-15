import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { Classroom, ClassroomMetaData } from "../../../feature/classrooms/domains/classroom.entity";
import { ClassroomRepo } from "../../../feature/classrooms/domains/classroom.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoClassroomRepo extends MongoBaseRepo<ClassroomMetaData> implements ClassroomRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "classroom", session);
  }

  async find(filter: Partial<{ name: string }>, options: { limit: number }): Promise<Classroom[]> {
    const query: FilterQuery<Classroom> = {
      $or: [],
    };

    if (filter.name) {
      query.$or?.push(
        { name: { $regex: filter.name, $options: "i" } },
        { newId: { $regex: filter.name, $options: "i" } },
      );
    }

    const queryResultPromise = this.model.find(query);

    if (options?.limit != undefined && options.limit > 0) queryResultPromise.limit(options.limit);

    return queryResultPromise.lean();
  }

  async getAvailableClassroomsInWeeklySession(query: {
    startTime: { day: number; timeStamps: number };
    endTime: { day: number; timeStamps: number };
    weeklySessionNewId: string | undefined;
    excludedWeek: "A" | "B" | undefined;
  }): Promise<Classroom[]> {
    const { startTime, endTime, weeklySessionNewId, excludedWeek } = query;
    const excludedWeekQuery = excludedWeek ? { week: { $ne: excludedWeek } } : {};
    const startTimeStamp = startTime.timeStamps;
    const endTimeStamp = endTime.timeStamps;
    const excludedSelectedWeeklySessionQuery = weeklySessionNewId
      ? { newId: { $ne: weeklySessionNewId } }
      : {};

    return this.model.aggregate<Classroom>([
      {
        $lookup: {
          from: "weeklysessions",
          let: { classroomId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$classroom", "$$classroomId"] },
                "startTime.day": startTime.day,
                "endTime.day": endTime.day,
                $or: [
                  {
                    "startTime.timeStamps": {
                      $gte: startTimeStamp,
                      $lt: endTimeStamp,
                    },
                  },
                  { "endTime.timeStamps": { $gt: startTimeStamp, $lte: endTimeStamp } },
                  {
                    "startTime.timeStamps": { $lt: startTimeStamp },
                    "endTime.timeStamps": { $gt: endTimeStamp },
                  },
                ],
                ...excludedWeekQuery,
                ...excludedSelectedWeeklySessionQuery,
              },
            },
          ],
          as: "overlappingSessions",
        },
      },
      { $match: { overlappingSessions: { $size: 0 } } },
    ]);
  }

  async getAvailableClassroomsInSession(
    startTime: Date,
    endTime: Date,
    sessionNewId: string | undefined,
    excludedWeek: "A" | "B" | undefined,
  ): Promise<Classroom[]> {
    const excludedWeekQuery = excludedWeek ? { week: { $ne: excludedWeek } } : {};

    const excludeSession = sessionNewId ? { newId: { $ne: sessionNewId } } : {};
    return this.model.aggregate<Classroom>([
      {
        $lookup: {
          from: "sessions",
          let: { classroomId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$classroom", "$$classroomId"] },
                $or: [
                  { startTime: { $gte: startTime, $lt: endTime } },
                  { endTime: { $gt: startTime, $lte: endTime } },
                  { startTime: { $lt: startTime }, endTime: { $gt: endTime } },
                ],
                ...excludeSession,
                ...excludedWeekQuery,
              },
            },
          ],
          as: "overlappingSessions",
        },
      },
      { $match: { overlappingSessions: { $size: 0 } } },
    ]);
  }

  async listClassrooms(
    filter: { name?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ClassroomMetaData, "sessionTypes" | "subjectTypes">>> {
    const filterQuery: FilterQuery<Classroom> = {};

    if (filter.name) filterQuery.name = { $regex: filter.name, $options: "i" };

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["sessionTypes", "subjectTypes"],
    });

    return data;
  }
}
