import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import {
  SmartCalendarSchedule,
  SmartCalendarScheduleMetaData,
} from "./smartCalendarSchedule.entity";

export abstract class SmartCalendarScheduleRepo extends BaseRepo<SmartCalendarScheduleMetaData> {
  abstract findInProgressSchedule(): Promise<SmartCalendarSchedule | null>;

  abstract listSchedules(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SmartCalendarScheduleMetaData, "generatedByAdmin">>>;
}
