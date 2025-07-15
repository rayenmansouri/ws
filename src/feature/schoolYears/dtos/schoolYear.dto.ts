import { ID } from "./../../../types/BaseEntity";

export type SchoolYearDto = {
  _id: ID;
  newId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  levelName: string;
};
