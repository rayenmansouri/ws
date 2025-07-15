import { ID } from "../../../types/BaseEntity";

export type GroupOverviewDTO = {
  _id: ID;
  newId: string;
  name: string;
  terms: {
    newId: string;
    _id: string;
    name: string;
    isLocked: boolean;
    isCompleted: boolean;
  }[];

  isIncludeInGradeBook: boolean;
  currentTermNewId: string | null;
};
