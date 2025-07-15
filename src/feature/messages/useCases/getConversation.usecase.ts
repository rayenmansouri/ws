import { UserMapper } from "./../../users/mappers/User.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageRepo } from "../domain/Message.repo";
import { ConversationDTO } from "../dtos/Conversation.dto";
import { ConversationMapper } from "./../mappers/ConversationMapper";

@injectable()
export class GetConversationUseCase {
  constructor(
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
    @inject("MessageRepo") private messageRepo: MessageRepo,
  ) {}

  async execute(conversationNewId: string, userId: ID): Promise<ConversationDTO> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
    );

    const populatedConversation = await this.conversationRepo.getConversationWithPopulatedMetaData(
      conversation._id,
    );

    const lastMessages = await this.messageRepo.findLastMessagesOfConversations([conversation._id]);

    return ConversationMapper.toConversationDTO({
      conversation: {
        _id: populatedConversation._id,
        newId: populatedConversation.newId,
        name: populatedConversation.name,
        isGroup: populatedConversation.isGroup,
        participants: populatedConversation.participants.map(participant => {
          return {
            user: {
              ...UserMapper.toUserProfileDTO(participant.user),
              userType: participant.userType,
            },
          };
        }),
      },
      lastMessage:
        lastMessages.length > 0 && lastMessages[0].lastMessage ? lastMessages[0].lastMessage : null,
      userId,
    });
  }
}
