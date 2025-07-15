import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Admin } from "../../admins/domain/admin.entity";

export const SMART_CALENDAR_SCHEDULE_STATUS_ENUM = {
  COMPLETED: "COMPLETED",
  IN_PROGRESS: "IN_PROGRESS",
  CANCELLED: "CANCELLED",
  ERROR: "ERROR",
} as const;
export type TSmartCalendarScheduleStatusEnum =
  (typeof SMART_CALENDAR_SCHEDULE_STATUS_ENUM)[keyof typeof SMART_CALENDAR_SCHEDULE_STATUS_ENUM];

export type SmartCalendarSchedule = {
  name: string;
  status: TSmartCalendarScheduleStatusEnum;
  generatedByAdmin: ID;
} & BaseEntity;

export type SmartCalendarScheduleMetaData = GenerateMetaData<
  SmartCalendarSchedule,
  {
    generatedByAdmin: Admin;
  }
>;
