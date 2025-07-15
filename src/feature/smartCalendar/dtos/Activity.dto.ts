import { ID } from "../../../types/BaseEntity";

export type ActivityDTO = {
  index: number;
  durationInMinutes: number;
  sessionType: {
    _id: ID;
    newId: string;
    name: string;
  };
  week: string | null;
  perGroup: boolean;
  subjectType: {
    _id: ID;
    newId: string;
    name: string;
  };
  subSubjectType: {
    _id: ID;
    newId: string;
    name: string;
  } | null;
};
