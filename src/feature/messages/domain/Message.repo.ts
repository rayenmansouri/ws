import { lastMessageOfConversation } from "./../dtos/Message.dto";
import { Populate } from "./../../../core/populateTypes";
import { BaseRepo } from "../../../core/BaseRepo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { TReactionTypeEnum } from "../../announcements/domain/reaction.entity";
import { ID } from "./../../../types/BaseEntity";
import { MessageMetaData, PopulatedMessageMetaData } from "./message.entity";
import { ListOptions } from "../../../types/types";

export abstract class MessageRepo extends BaseRepo<MessageMetaData> {
  abstract addMessageReactionForUser(
    messageId: ID,
    userType: TEndUserEnum,
    userId: ID,
    reactionType: TReactionTypeEnum,
    tenantId: string,
  ): Promise<void>;

  abstract updateMessageReactionOfUser(
    messageId: ID,
    userId: ID,
    reactionType: TReactionTypeEnum,
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
