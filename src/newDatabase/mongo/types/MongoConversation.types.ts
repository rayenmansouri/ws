import { BaseUser } from "../../../feature/users/domain/baseUser.entity";
import {
  Conversation,
  ConversationParticipant,
} from "./../../../feature/messages/domain/conversation.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";

export type FindOneConversationByParticipantIdsQueryType = {
  $and: Array<{
    "participants.user"?: {
      $all?: ID[];
      $nin?: ID[];
    };
    participants?: {
      $not?: {
        $elemMatch?: {
          user: { $nin: ID[] };
        };
      };
      $size?: number;
    };
    isDeleted?: boolean;
    isGroup?: boolean;
  }>;
};

export type PopulatedConversationParticipant = Omit<ConversationParticipant, "user"> & {
  user: BaseUser;
};

export type PopulatedConversation = Omit<Conversation, "participants"> & {
  participants: PopulatedConversationParticipant[];
};

export type UserConversationFilter = {
  userType: TEndUserEnum;
  userId: ID;
  isGroup?: boolean;
  isSeen?: boolean;
  search?: string;
};

export type PaginationOptions = {
  page: number;
  limit: number;
};
