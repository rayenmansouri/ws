import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ConversationRepo } from "../domain/Conversation.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { UpdateConversationNameDTO } from "./../dtos/UpdateGroupConversationNameRequest.dto";
import { ConversationNameUpdatedEvent } from "./../events/updateConversationName.event";

@injectable()
export class UpdateConversationNameUseCase {
  constructor(@inject("ConversationRepo") private readonly conversationRepo: ConversationRepo) {}

  async execute(dto: UpdateConversationNameDTO): Promise<void> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      dto.conversationNewId,
      "notFound.conversation",
    );

    if (!conversation.isGroup) {
      throw new BadRequestError("conversations.groupConversationNameUpdateOnlyAllowed");
    }

    if (
      !ConversationDomainService.isParticipantHasAdminRoleInGroup(
        dto.userId,
        conversation.participants,
      )
    )
      throw new BadRequestError("conversations.youAreNotAdminInsideThisGroup");

    if (conversation.name !== dto.name) {
      await this.conversationRepo.updateOneById(conversation._id, {
        name: dto.name,
      });

      const updateConversationNameEvent = new ConversationNameUpdatedEvent(dto.tenantId, {
        conversationId: conversation._id,
        conversationName: dto.name,
        conversationNewId: conversation.newId,
      });

      const participantsWithoutSender = conversation.participants
        .filter(participant => participant.user !== dto.userId)
        .map(participant => ({
          id: participant.user,
          type: participant.userType,
        }));

      updateConversationNameEvent.sendEventToUsers(participantsWithoutSender, ["mobile", "web"]);
    }
  }
}
