import { ID } from "./../../../types/BaseEntity";
import { TEndUserEnum } from "./../../../constants/globalEnums";

export type VerifyUserExistenceDTO = {
  userType: TEndUserEnum;
  user: ID;
};
