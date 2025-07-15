import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { TEndUserEnum, END_USER_WITHOUT_MASTER_ENUM } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export const CONVERSATION_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type TConversationRoleEnums = (typeof CONVERSATION_ROLE)[keyof typeof CONVERSATION_ROLE];

export const userTypesAllowedToStartConversation: TEndUserEnum[] = [
  END_USER_WITHOUT_MASTER_ENUM.ADMIN,
];

export type ConversationParticipant = {
  userType: TEndUserEnum;
  user: ID;
  joinedAt: Date;
  role: TConversationRoleEnums;
};

export type Conversation = {
  name: string | null;
  isGroup: boolean;
  participants: ConversationParticipant[];
  seenStatus: {
    [userId: ID]: {
      userType: TEndUserEnum;
      seenAt: Date;
      message: ID;
    };
  };
} & BaseEntity;

export type ConversationMetaData = GenerateMetaData<
  Conversation,
  {
    "participants.user": BaseUser;
  }
>;
