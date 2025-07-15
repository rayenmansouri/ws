import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type Participant = {
  _id: ID | null;
  newId: string | null;
  userType: TEndUserEnum;
  fullName: string | null;
  avatar: string | null;
  email: string | null;
  phoneNumber: string | null;
};
