import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageRepo } from "../domain/Message.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { userWithUserType } from "./../domain/Conversation.repo";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { ConversationDTO } from "./../dtos/Conversation.dto";
import { MessageDTO } from "./../dtos/Message.dto";
import { UpdateConversationSeenStatusDTO } from "./../dtos/UpdateConversationSeenStatusRequest.dto";
import { NewSeenAddedEvent } from "./../events/newSeen.event";
import { ConversationMapper } from "./../mappers/ConversationMapper";

@injectable()
export class UpdateConversationSeenStatusUseCase {
  constructor(
    @inject("ConversationRepo") private readonly conversationRepo: ConversationRepo,
    @inject("MessageRepo") private readonly messageRepo: MessageRepo,
  ) {}

  async execute(dto: UpdateConversationSeenStatusDTO): Promise<void> {
    const conversation = await this.conversationRepo.getConversationWithPopulatedMetaData(
      dto.conversationId,
    );

    const participantIds = conversation.participants.map(p => p.user._id);

    if (!ConversationDomainService.isParticipant(dto.userId, participantIds)) {
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");
    }

    const lastMessage = await this.messageRepo.findLastMessageOfConversation(conversation._id);

    if (!lastMessage) {
      return;
    }

    await this.conversationRepo.updateSeenStatus(
      dto.conversationId,
      dto.userId,
      lastMessage._id,
      dto.userType,
      dto.tenantId,
    );

    const populatedLastMessage = await this.messageRepo.getPopulatedMetaDataMessageByIdOrThrow(
      lastMessage?._id,
    );

    const messageDTO = ConversationMapper.toMessageDTO(populatedLastMessage, conversation);

    const lastMessageDTO = ConversationMapper.toLastMessageDTO(
      {
        _id: messageDTO._id,
        newId: messageDTO.newId,
        senderId: messageDTO.sender ? messageDTO.sender._id : null,
        content: messageDTO.content,
        sentAt: populatedLastMessage.sentAt,
        files: populatedLastMessage.files.map(file => file._id),
        media: populatedLastMessage.media.map(media => media._id),
        isDeleted: populatedLastMessage.isDeleted,
      },
      messageDTO.sender ? messageDTO.sender.fullName : null,
      [],
    );

    const conversationDTO = ConversationMapper.toConversationDTO({
      conversation: {
        _id: conversation._id,
        newId: conversation.newId,
        name: conversation.name,
        isGroup: conversation.isGroup,
        participants: conversation.participants.map(participant => {
          return {
            user: {
              ...UserMapper.toUserProfileDTO(participant.user),
              userType: participant.userType,
            },
          };
        }),
      },
      lastMessage: lastMessageDTO,
      userId: dto.userId,
    });

    const usersWithType = conversation.participants.map(participant => ({
      user: participant.user._id,
      userType: participant.userType,
    }));

    this.notifyNewSeenStatus(
      usersWithType,
      {
        ...messageDTO,
        seenBy: [
          ...messageDTO.seenBy,
          {
            _id: dto.userId,
            userType: dto.userType,
            fullName: dto.fullName,
            avatar: dto.avatar,
            newId: dto.newId,
            email: dto.email,
            phoneNumber: dto.phoneNumber,
            seenAt: getCurrentTimeOfSchool(dto.tenantId),
          },
        ],
      },
      dto.userId,
      dto.avatar,
      conversationDTO,
      dto.tenantId,
    );
  }

  private notifyNewSeenStatus(
    usersWithType: userWithUserType[],
    message: MessageDTO,
    userId: ID,
    avatar: string,
    conversation: ConversationDTO,
    tenantId: string,
  ): void {
    const participantsWithoutSender = usersWithType
      .filter(participant => participant.user !== userId)
      .map(participant => ({
        id: participant.user,
        type: participant.userType,
      }));

    const reactionEvent = new NewSeenAddedEvent(tenantId, {
      message,
      userId,
      avatar,
      conversation,
    });

    reactionEvent.sendEventToUsers(participantsWithoutSender, ["mobile", "web"]);
  }
}
