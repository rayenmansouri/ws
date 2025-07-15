import { Types } from "mongoose";
import { SmartCalendarSchedule } from "../../../feature/smartCalendar/domain/smartCalendarSchedule.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSmartCalendarScheduleSchema = createMongoSchema<SmartCalendarSchedule>({
  name: String,
  status: String,
  generatedByAdmin: { type: Types.ObjectId, ref: "admin" },
});
