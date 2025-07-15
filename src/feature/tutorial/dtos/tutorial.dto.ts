import { ID } from "../../../types/BaseEntity";

export type TutorialDto = {
  title: string;
  newId: string;
  _id: ID;
  link: string;
  interfaceKeys: string[];
};
