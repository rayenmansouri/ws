import { ID } from "../../../types/BaseEntity";

export type HolidayDto = {
  name: string;
  startDate: Date;
  endDate: Date;
  levels: { newId: string; _id: ID; name: string }[];
  newId: string;
};

export type HolidayInScheduleDto = {
  name: string;
  newId: string;
  _id: ID;
  date: Date;
};
