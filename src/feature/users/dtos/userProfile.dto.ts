import { ID } from "../../../types/BaseEntity";

export type UserProfileDTO = {
  _id: ID;
  newId: string;
  fullName: string;
  avatar: string;
  email: string | null;
  phoneNumber: string | null;
};
