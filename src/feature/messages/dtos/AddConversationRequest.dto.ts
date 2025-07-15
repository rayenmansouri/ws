import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type AddConversationRequestDTO = {
  participants: { _id: ID; userType: TEndUserEnum }[];
  schoolId: string;
  userType: TEndUserEnum;
  userId: ID;
};
