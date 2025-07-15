import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { TSmartCalendarScheduleStatusEnum } from "../domain/smartCalendarSchedule.entity";

export type SmartCalendarScheduleDTO = {
  _id: string;
  newId: string;
  name: string;
  status: TSmartCalendarScheduleStatusEnum;
  generatedAt: Date;
  generatedByAdmin: UserProfileDTO;
};
