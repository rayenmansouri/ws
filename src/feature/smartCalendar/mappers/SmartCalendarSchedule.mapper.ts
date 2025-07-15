import { Populate } from "../../../core/populateTypes";
import { UserMapper } from "../../users/mappers/User.mapper";
import { SmartCalendarScheduleMetaData } from "../domain/smartCalendarSchedule.entity";
import { SmartCalendarScheduleDTO } from "../dtos/SmartCalendarSchedule.dto";

export class SmartCalendarScheduleMapper {
  static toDTO(
    schedule: Populate<SmartCalendarScheduleMetaData, "generatedByAdmin">,
  ): SmartCalendarScheduleDTO {
    return {
      _id: schedule._id,
      newId: schedule.newId,
      name: schedule.name,
      status: schedule.status,
      generatedAt: schedule.createdAt,
      generatedByAdmin: UserMapper.toUserProfileDTO(schedule.generatedByAdmin),
    };
  }
}
