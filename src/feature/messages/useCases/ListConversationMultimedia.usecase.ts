import { MessageAttachmentDTO } from "./../dtos/Message.dto";
import { MessageAttachmentMapper } from "./../mappers/MessageAttachmentMapper";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { injectable } from "inversify";
import { ID } from "./../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { MessageAttachmentRepo } from "../domain/MessageAttachment.repo";
import { ListOptions } from "../../../types/types";
import { ConversationRepo } from "../domain/Conversation.repo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

@injectable()
export class ListConversationMultimediaUseCase {
  constructor(
    @inject("MessageAttachmentRepo")
    private messageAttachmentRepo: MessageAttachmentRepo,
    @inject("ConversationRepo")
    private conversationRepo: ConversationRepo,
  ) {}

  async execute(
    conversationNewId: string,
    userId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<MessageAttachmentDTO>> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
    );

    const participantIds: ID[] = conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(userId, participantIds))
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    const data = await this.messageAttachmentRepo.listConversationMultimedia(
      conversation._id,
      "media",
      options,
    );

    const mappedData = data.docs.map(attachment => {
      return MessageAttachmentMapper.toMessageAttachmentDTO(attachment);
    });

    return {
      docs: mappedData,
      meta: data.meta,
    };
  }
}
