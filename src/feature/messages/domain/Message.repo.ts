import { lastMessageOfConversation } from "./../dtos/Message.dto";
import { Populate } from "./../../../core/populateTypes";
import { BaseRepo } from "../../../core/BaseRepo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ID } from "./../../../types/BaseEntity";
import {
  MessageMetaData,
  PopulatedMessageMetaData,
  TMessageReactionTypeEnum,
} from "./message.entity";
import { ListOptions } from "../../../types/types";

export abstract class MessageRepo extends BaseRepo<MessageMetaData> {
  abstract addMessageReactionForUser(
    messageId: ID,
    userType: TEndUserEnum,
    userId: ID,
    reactionType: TMessageReactionTypeEnum,
    tenantId: string,
  ): Promise<void>;

  abstract updateMessageReactionOfUser(
    messageId: ID,
    userId: ID,
    reactionType: TMessageReactionTypeEnum,
  ): Promise<void>;

  abstract deleteMessageReactionOfUser(messageId: ID, userId: ID): Promise<void>;

  abstract listConversationMessages(
    conversationNewId: string,
    options: ListOptions,
  ): Promise<ResponseWithPagination<PopulatedMessageMetaData>>;

  abstract getPopulatedMetaDataMessageByIdOrThrow(
    messageId: string,
  ): Promise<PopulatedMessageMetaData>;

  abstract findLastMessagesOfConversations(
    conversationIds: ID[],
  ): Promise<lastMessageOfConversation[]>;

  abstract findLastMessageOfConversation(
    conversationId: ID,
  ): Promise<MessageMetaData["entity"] | null>;

  abstract findOneWithPopulatedReactions(
    messageNewId: string,
  ): Promise<Populate<MessageMetaData, "reactions.user" | "conversation"> | null>;
}
