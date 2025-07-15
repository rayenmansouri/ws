import { ID } from "../../../types/BaseEntity";

export type SectionDto = {
  newId: string;
  _id: ID;
  name: string;
  subLevels: {
    name: string;
    newId: string;
    _id: ID;
  }[];
};
