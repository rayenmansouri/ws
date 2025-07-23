import { UserMapper } from "./../../users/mappers/User.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageRepo } from "../domain/Message.repo";
import { ConversationDTO } from "../dtos/Conversation.dto";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { PopulatedConversation } from "../../../newDatabase/mongo/types/MongoConversation.types";
import { LastMessageDTO } from "./../dtos/Conversation.dto";
import { lastMessageOfConversation } from "./../dtos/Message.dto";
import { ConversationMapper } from "./../mappers/ConversationMapper";
import { seenStatusDTO } from "./../dtos/Message.dto";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

type ConversationFilter = {
  userId: ID;
  userType: TEndUserEnum;
  search?: string;
  isGroup?: boolean;
  isSeen?: boolean;
};

@injectable()
export class ListConversationsUseCase {
  constructor(
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
    @inject("MessageRepo") private messageRepo: MessageRepo,
  ) {}

  async execute(
    filter: ConversationFilter,
    options: ListOptions,
  ): Promise<ResponseWithPagination<ConversationDTO>> {
    const { conversations, conversationIds } = await this.fetchConversations(filter, options);

    const lastMessages = await this.messageRepo.findLastMessagesOfConversations(conversationIds);

    const mappedMessages = this.mapLastMessagesWithSeenStatus(lastMessages, conversations.docs);

    const docs = this.createConversationDTOs(conversations.docs, mappedMessages, filter.userId);

    return {
      docs,
      meta: conversations.meta,
    };
  }

  private async fetchConversations(filter: ConversationFilter, options: ListOptions) {
    const conversations = await this.conversationRepo.listUserConversations(filter, options);
    const conversationIds = conversations.docs.map(conversation => conversation._id);
    return { conversations, conversationIds };
  }

  private mapLastMessagesWithSeenStatus(
    lastMessages: lastMessageOfConversation[],
    conversations: PopulatedConversation[],
  ) {
    return lastMessages.map(message => {
      const matchedConversation = conversations.find(
        conversation => conversation._id === message.conversation,
      );
      if (!matchedConversation) {
        throw new BadRequestError("notFound.conversation");
      }

      if (!message.lastMessage) {
        return { ...message, lastMessage: null };
      }

      return {
        ...message,
        lastMessage: this.createLastMessageDTO(
          message.lastMessage,
          matchedConversation,
          message.seenStatus,
        ),
      };
    });
  }

  private createLastMessageDTO(
    lastMessage: LastMessageDTO,
    conversation: PopulatedConversation,
    seenStatus: seenStatusDTO,
  ): LastMessageDTO {
    return ConversationMapper.toLastMessageDTO(
      {
        _id: lastMessage._id,
        newId: lastMessage.newId,
        senderId: !lastMessage.isDeleted ? lastMessage.senderId : null,
        content: !lastMessage?.isDeleted ? lastMessage.content : null,
        sentAt: lastMessage.sentAt,
        files: !lastMessage.isDeleted ? lastMessage.files : [],
        media: !lastMessage.isDeleted ? lastMessage.media : [],
        isDeleted: lastMessage.isDeleted,
      },
      lastMessage ? lastMessage.senderName : null,
      ConversationMapper.toSeenStatus(lastMessage!._id, {
        ...conversation,
        seenStatus,
      }),
    );
  }

  private createConversationDTOs(
    conversations: PopulatedConversation[],
    mappedMessages: lastMessageOfConversation[],
    userId: ID,
  ): ConversationDTO[] {
    return conversations.map(conversation => {
      const lastMessageOfConversation = mappedMessages.find(
        message => message.conversation === conversation._id,
      );

      return ConversationMapper.toConversationDTO({
        conversation: {
          _id: conversation._id,
          newId: conversation.newId,
          name: conversation.name,
          isGroup: conversation.isGroup,
          participants: conversation.participants.map(participant => ({
            user: {
              ...UserMapper.toUserProfileDTO(participant.user),
              userType: participant.userType,
            },
          })),
        },
        lastMessage: lastMessageOfConversation?.lastMessage ?? null,
        userId,
      });
    });
  }
}
