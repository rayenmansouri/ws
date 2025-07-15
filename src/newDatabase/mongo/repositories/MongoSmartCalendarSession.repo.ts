import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarSessionMetaData } from "../../../feature/smartCalendar/domain/smartCalendarSession.entity";
import { SmartCalendarSessionRepo } from "../../../feature/smartCalendar/domain/SmartCalendarSession.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";

export class MongoSmartCalendarSessionRepo
  extends MongoBaseRepo<SmartCalendarSessionMetaData>
  implements SmartCalendarSessionRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "smartCalendarSession", session);
  }

  async deleteManyBySmartCalendarSchedule(smartCalendarScheduleId: ID): Promise<void> {
    await this.model.deleteMany({ smartCalendarSchedule: smartCalendarScheduleId });
  }

  async findManyBySmartCalendarSchedule<
    FieldsToPopulate extends keyof SmartCalendarSessionMetaData["populatedFields"] = never,
  >(
    smartCalendarScheduleId: ID,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<SmartCalendarSessionMetaData, FieldsToPopulate>[]> {
    return this.model
      .find({ smartCalendarSchedule: smartCalendarScheduleId })
      .populate(options?.populate ?? []);
  }
}
