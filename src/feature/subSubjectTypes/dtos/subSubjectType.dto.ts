import { ID } from "../../../types/BaseEntity";

export type SubSubjectTypeDto = {
  name: string;
  newId: string;
  _id: ID;
  preferredStartingHours: number[];
  illustration: string;
};
