import { TScheduleEntityEnum } from "../../../helpers/constants";
import { ID } from "../../../types/BaseEntity";

export type EntityScheduleDto = {
  type: TScheduleEntityEnum;
  name: string;
  newId: string;
  avatar: string | null;
  _id: ID;
};
