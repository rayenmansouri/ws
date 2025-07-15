import { ID } from "./../../../types/BaseEntity";
import { TEndUserEnum } from "./../../../constants/globalEnums";

export type VerifyUserExistenceResponseDTO = {
  userType: TEndUserEnum;
  _id: ID;
  fullName: string;
  avatar: string;
  newId: string;
};
