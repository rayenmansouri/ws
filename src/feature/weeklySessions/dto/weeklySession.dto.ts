import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type WeeklySessionDTO = {
  newId: string;
  _id: ID;
  week: string | null;
  startDate: {
    day: number;
    hours: number;
    minutes: number;
  };
  endDate: {
    day: number;
    hours: number;
    minutes: number;
  };
  topic: EntityDto;
  classroom: EntityDto;
  group: EntityDto | null;
  sessionType: EntityDto;
  class: EntityDto | null;
  teacher: UserProfileDTO | null;
};
