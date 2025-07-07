import { ID } from "../../../shared/value-objects/ID.vo";

export type MasterDTO = {
  _id: ID;
  newId: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  fullName: string;
  avatar: string;
  gender: string;
  email: string | null;
  phoneNumber: string | null;
  roles: { _id: ID; newId: string; name: string }[];
};
