import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { MessageRepo } from "../domain/Message.repo";
import { MessageAttachmentRepo } from "../domain/MessageAttachment.repo";
import { MessageLinksRepo } from "../domain/MessageLinks.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "./../../../types/BaseEntity";
import { ConversationParticipant } from "./../domain/conversation.entity";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { DeletedMessageEvent } from "./../events/deletedMessage.event";

@injectable()
export class DeleteMessageUseCase {
  constructor(
    @inject("MessageRepo") private readonly messageRepo: MessageRepo,
    @inject("MessageAttachmentRepo")
    private readonly messageAttachmentRepo: MessageAttachmentRepo,
    @inject("MessageLinksRepo") private readonly messageLinksRepo: MessageLinksRepo,
  ) {}

  async execute(messageNewId: string, userId: ID, tenantId: string): Promise<void> {
    const message = await this.messageRepo.findOneByNewIdOrThrow(messageNewId, "notFound.message", {
      populate: ["conversation"],
    });

    const participantIds = message.conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(userId, participantIds))
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    if (!message.isDeleted) {
      await Promise.all([
        this.messageRepo.updateOneById(message._id, { isDeleted: true }),
        this.messageAttachmentRepo.deleteManyByMessageId(message._id),
        this.messageLinksRepo.deleteMessageLinksOfMessage(message._id),
      ]);

      this.notifyParticipants(
        { _id: message.conversation._id, newId: message.conversation.newId },
        { _id: message._id, newId: message.newId },
        message.conversation.participants,
        userId,
        tenantId,
      );
    }
  }

  private notifyParticipants(
    conversation: {
      _id: ID;
      newId: string;
    },
    message: {
      _id: ID;
      newId: string;
    },
    conversationParticipants: ConversationParticipant[],
    userId: string,
    tenantId: string,
  ): void {
    const participantsIdsWithoutSender = conversationParticipants
      .filter(participant => participant.userType !== userId)
      .map(participant => {
        return {
          id: participant.user,
          type: participant.userType,
        };
      });
    const messageEvent = new DeletedMessageEvent(tenantId, {
      messageId: message._id,
      messageNewId: message.newId,
      conversationId: conversation._id,
      conversationNewId: conversation.newId,
    });

    messageEvent.sendEventToUsers(participantsIdsWithoutSender);
  }
}
