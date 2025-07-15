import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MessageRepo } from "../domain/Message.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "./../../../types/BaseEntity";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { TMessageReactionTypeEnum } from "./../domain/message.entity";
import { GetMessagesReactionsDto } from "./../dtos/GetMessagesReactions.dto";
import { UserMapper } from "../../users/mappers/User.mapper";

@injectable()
export class GetMessageReactionsUseCase {
  constructor(@inject("MessageRepo") private readonly messageRepo: MessageRepo) {}

  async execute(conversationNewId: string, userId: ID): Promise<GetMessagesReactionsDto[]> {
    const message = await this.messageRepo.findOneWithPopulatedReactions(conversationNewId);

    if (!message) throw new BadRequestError("notfound.message");

    const participantIds = message.conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(userId, participantIds))
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    const reactions = message.reactions
      .filter(reaction => reaction.reactionType !== null)
      .sort((a, b) => new Date(b.reactedAt).getTime() - new Date(a.reactedAt).getTime())
      .map(reaction => {
        return {
          reactionType: reaction.reactionType as TMessageReactionTypeEnum,
          reactedAt: reaction.reactedAt,
          user: {
            ...UserMapper.toUserProfileDTO(reaction.user),
            type: reaction.userType,
          },
        };
      });

    return reactions;
  }
}
