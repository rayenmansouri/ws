import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import {
  SMART_CALENDAR_SCHEDULE_STATUS_ENUM,
  SmartCalendarSchedule,
  SmartCalendarScheduleMetaData,
} from "../../../feature/smartCalendar/domain/smartCalendarSchedule.entity";
import { SmartCalendarScheduleRepo } from "../../../feature/smartCalendar/domain/SmartCalendarSchedule.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoSmartCalendarScheduleRepo
  extends MongoBaseRepo<SmartCalendarScheduleMetaData>
  implements SmartCalendarScheduleRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "smartCalendarSchedule", session);
  }

  async findInProgressSchedule(): Promise<SmartCalendarSchedule | null> {
    return await this.model.findOne({ status: SMART_CALENDAR_SCHEDULE_STATUS_ENUM.IN_PROGRESS });
  }

  async listSchedules(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SmartCalendarScheduleMetaData, "generatedByAdmin">>> {
    const query: FilterQuery<SmartCalendarSchedule> = {};

    if (filter.search) query.name = { $regex: filter.search, $options: "i" };

    const schedules = await this.findManyWithPagination(query, {
      ...options,
      populate: ["generatedByAdmin"],
    });

    return schedules;
  }
}
