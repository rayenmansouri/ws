import { BaseRepo } from "../../../core/BaseRepo";
import { ListOptions } from "../../../types/types";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ID } from "./../../../types/BaseEntity";
import {
  ConversationMetaData,
  ConversationParticipant,
  TConversationRoleEnums,
} from "./conversation.entity";
import { Conversation } from "../domain/conversation.entity";

export type userWithUserType = {
  user: ID;
  userType: TEndUserEnum;
};

export abstract class ConversationRepo extends BaseRepo<ConversationMetaData> {
  abstract listUserConversations: (
    filter: { userType: TEndUserEnum; userId: ID },
    options: ListOptions,
  ) => Promise<ResponseWithPagination<Populate<ConversationMetaData, "participants.user">>>;

  abstract listConversationParticipants: (
    conversationNewId: string,
    options: { page: number; limit: number; role?: TConversationRoleEnums },
  ) => Promise<ResponseWithPagination<Populate<ConversationMetaData, "participants.user">>>;

  abstract getConversationWithPopulatedMetaData: (
    conversationId: ID,
  ) => Promise<Populate<ConversationMetaData, "participants.user">>;

  abstract updateConversationParticipants: (
    conversationId: ID,
    addedParticipants: ConversationParticipant[],
    deletedParticipantIds: ID[],
  ) => Promise<void>;

  abstract createGroupConversation: (
    participants: ConversationParticipant[],
  ) => Promise<Conversation>;

  abstract findConversationByParticipantIds: (
    participantIds: ID[],
  ) => Promise<Populate<ConversationMetaData, "participants.user"> | null>;

  abstract updateSeenStatus: (
    conversationId: ID,
    userId: ID,
    lastSeenMessageId: ID,
    userType: TEndUserEnum,
    tenantId: string,
  ) => Promise<void>;

  abstract getUnseenConversationNumberForUser(userId: ID): Promise<number>;
}
