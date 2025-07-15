import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageRepo } from "../domain/Message.repo";
import { MessageDTO } from "../dtos/Message.dto";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ID } from "./../../../types/BaseEntity";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { ConversationMapper } from "./../mappers/ConversationMapper";
import { ListOptions } from "../../../types/types";

@injectable()
export class ListConversationMessagesUseCase {
  constructor(
    @inject("MessageRepo") private messageRepo: MessageRepo,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
  ) {}

  async execute(
    conversationNewId: string,
    userId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<MessageDTO>> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
      {
        populate: ["participants.user"],
      },
    );

    const participantIds = conversation.participants.map(participant => participant.user._id);

    const isParticipant = ConversationDomainService.isParticipant(userId, participantIds);

    if (!isParticipant) throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    const result = await this.messageRepo.listConversationMessages(conversation._id, options);

    const mappedMessages = result.docs.map(message => {
      const messageDTO = ConversationMapper.toMessageDTO(message, conversation);
      return messageDTO;
    });

    return {
      docs: mappedMessages,
      meta: result.meta,
    };
  }
}
