import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { SmartCalendarSessionMetaData } from "./smartCalendarSession.entity";

export abstract class SmartCalendarSessionRepo extends BaseRepo<SmartCalendarSessionMetaData> {
  abstract deleteManyBySmartCalendarSchedule(smartCalendarScheduleId: ID): Promise<void>;

  abstract findManyBySmartCalendarSchedule<
    FieldsToPopulate extends keyof SmartCalendarSessionMetaData["populatedFields"] = never,
  >(
    smartCalendarScheduleId: ID,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<SmartCalendarSessionMetaData, FieldsToPopulate>[]>;
}
