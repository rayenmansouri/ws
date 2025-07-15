import { ID } from "../../../types/BaseEntity";

export type IssueReasonDTO = {
  _id: ID;
  newId: string;
  name: string;
  color: string;
  iconUrl: string;
};
