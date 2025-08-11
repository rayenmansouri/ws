import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { Conversation } from "../domain/conversation.entity";
import { ConversationDomainService } from "../domain/Conversation.service";
import { MessageRepo } from "../domain/Message.repo";
import { AddReactToMessageRequestDTO } from "../dtos/AddReactionToMessageRequest.dto";
import { Populate } from "./../../../core/populateTypes";
import {
  MessageMetaData,
  MessageReaction,
  TMessageReactionTypeEnum,
} from "./../domain/message.entity";
import { NewReactionAddedEvent } from "./../events/newReaction.event";

@injectable()
export class ReactToMessageUseCase {
  constructor(@inject("MessageRepo") private messageRepo: MessageRepo) {}

  async execute(reactionRequestDto: AddReactToMessageRequestDTO): Promise<{
    message: Populate<MessageMetaData, "conversation">;
    reactions: { reactionType: TMessageReactionTypeEnum | null; userId: ID }[];
  }> {
    const message = await this.messageRepo.findOneByNewIdOrThrow(
      reactionRequestDto.messageNewId,
      "notFound.message",
      {
        populate: ["conversation"],
      },
    );

    const participantIds = message.conversation.participants.map(participant => participant.user);
    const isParticipant = ConversationDomainService.isParticipant(
      reactionRequestDto.userId,
      participantIds,
    );

    if (!isParticipant) {
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");
    }

    const userReactedIds = message.reactions.map(reaction => reaction.user);
    const isExistingReaction = this.hasUserReacted(reactionRequestDto.userId, userReactedIds);

    if (isExistingReaction) {
      await this.handleExistingReaction(reactionRequestDto, message._id);
    } else {
      await this.handleNewReaction(reactionRequestDto, message._id);
    }

    const userReactions = this.getUserReactions(
      message.reactions,
      reactionRequestDto.userId,
      reactionRequestDto.reactionType,
    );

    this.notifyParticipants(
      message._id,
      reactionRequestDto,
      userReactions,
      message.conversation,
      reactionRequestDto.userId,
    );
    return {
      message,
      reactions: userReactions,
    };
  }

  private hasUserReacted(userId: ID, userReactedIds: ID[]): boolean {
    return userReactedIds.includes(userId);
  }

  private async handleExistingReaction(
    dto: AddReactToMessageRequestDTO,
    messageId: ID,
  ): Promise<void> {
    if (dto.reactionType === null) {
      await this.messageRepo.deleteMessageReactionOfUser(messageId, dto.userId);
    } else {
      await this.messageRepo.updateMessageReactionOfUser(messageId, dto.userId, dto.reactionType);
    }
  }

  private async handleNewReaction(dto: AddReactToMessageRequestDTO, messageId: ID): Promise<void> {
    if (dto.reactionType) {
      await this.messageRepo.addMessageReactionForUser(
        messageId,
        dto.userType,
        dto.userId,
        dto.reactionType,
        dto.tenantId,
      );
    } else throw new BadRequestError("reaction must be found");
  }

  private getUserReactions(
    reactions: MessageReaction[],
    user: ID,
    reactionType: TMessageReactionTypeEnum | null,
  ): { reactionType: TMessageReactionTypeEnum | null; userId: ID }[] {
    const existingReactionIndex = reactions.findIndex(r => r.user === user);
    const newReaction: MessageReaction = {
      reactionType,
      user,
      userType: reactions[existingReactionIndex]?.userType,
      reactedAt: new Date(),
    };

    if (existingReactionIndex !== -1) {
      reactions[existingReactionIndex] = newReaction;
    } else {
      reactions.push(newReaction);
    }

    const result = reactions.map(reaction => {
      return {
        userId: reaction.user,
        reactionType: reaction.reactionType,
      };
    });
    return result;
  }

  public async notifyParticipants(
    messageId: ID,
    addReactionRequestDto: AddReactToMessageRequestDTO,
    reactions: { reactionType: TMessageReactionTypeEnum | null; userId: ID }[],
    conversation: Conversation,
    userId: ID,
  ): Promise<void> {
    const participantsWithoutSender = conversation.participants
      .filter(participant => participant.user !== userId)
      .map(participant => ({
        id: participant.user,
        type: participant.userType,
      }));

    const reactionEvent = new NewReactionAddedEvent(addReactionRequestDto.tenantId, {
      messageId: messageId,
      reactions,
    });

    reactionEvent.sendEventToUsers(participantsWithoutSender, ["mobile", "web"]);
  }
}
