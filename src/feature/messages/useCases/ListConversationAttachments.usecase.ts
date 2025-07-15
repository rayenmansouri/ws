import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageAttachmentRepo } from "../domain/MessageAttachment.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "./../../../types/BaseEntity";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { MessageAttachmentDTO } from "./../dtos/Message.dto";
import { MessageAttachmentMapper } from "./../mappers/MessageAttachmentMapper";

@injectable()
export class ListConversationAttachmentsUseCase {
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
      "file",
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
