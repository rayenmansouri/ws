import { ID } from "../../../types/BaseEntity";
import { GroupDto } from "./Group.dto";

export type StudentInClassDto = {
  _id: ID;
  newId: string;
  fullName: string;
  group: GroupDto;
  gender: string;
  email: string | null;
  avatar: string;
};
