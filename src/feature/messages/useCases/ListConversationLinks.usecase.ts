import { MessageLinkMapper } from "./../mappers/MessageLinkMapper";
import { MessageLinkDTO } from "./../dtos/Message.dto";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { MessageLinksRepo } from "../domain/MessageLinks.repo";
import { ID } from "./../../../types/BaseEntity";
import { ConversationRepo } from "../domain/Conversation.repo";

@injectable()
export class ListConversationLinksUseCase {
  constructor(
    @inject("MessageLinksRepo")
    private messageLinksRepo: MessageLinksRepo,

    @inject("ConversationRepo")
    private conversationRepo: ConversationRepo,
  ) {}

  async execute(
    conversationNewId: string,
    userId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<MessageLinkDTO>> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
    );

    const participantIds: ID[] = conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(userId, participantIds))
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    const data = await this.messageLinksRepo.listConversationLinks(conversation._id, options);

    const mappedData = data.docs.map(messageLink => {
      return MessageLinkMapper.toMessageLinkDTO(messageLink);
    });

    return {
      docs: mappedData,
      meta: data.meta,
    };
  }
}
