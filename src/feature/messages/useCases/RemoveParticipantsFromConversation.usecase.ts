import { RemoveParticipantsFromConversationDTO } from "./../dtos/RemoveParticipantFromGroupRequest.dto";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { injectable } from "inversify";
import { ConversationRepo } from "../domain/Conversation.repo";
import { inject } from "../../../core/container/TypedContainer";
import { ConversationDomainService } from "../domain/Conversation.service";

const MINIMUM_GROUP_PARTICIPANTS_SIZE = 3;
@injectable()
export class RemoveParticipantsFromConversationUseCase {
  constructor(@inject("ConversationRepo") private readonly conversationRepo: ConversationRepo) {}

  async execute(dto: RemoveParticipantsFromConversationDTO): Promise<void> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      dto.conversationNewId,
      "notFound.conversation",
    );

    const participantIds = conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(dto.userId, participantIds))
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");

    if (
      !ConversationDomainService.isParticipantHasAdminRoleInGroup(
        dto.userId,
        conversation.participants,
      )
    )
      throw new BadRequestError("conversations.youAreNotAdminInsideThisGroup");

    if (!conversation.isGroup)
      throw new BadRequestError("conversations.groupConversationRemoveParticipantsOnlyAllowed");

    const participantsToRemoveIds = new Set(dto.participantsIds);

    const deletedParticipants = conversation.participants
      .filter(participant => participantsToRemoveIds.has(participant.user))
      .map(participant => ({
        user: participant.user,
        userType: participant.userType,
      }));

    const remainingParticipants = conversation.participants.filter(
      participant => !participantsToRemoveIds.has(participant.user),
    );

    const finalParticipantCount = remainingParticipants.length;

    if (finalParticipantCount < MINIMUM_GROUP_PARTICIPANTS_SIZE) {
      throw new BadRequestError("conversations.cannotRemoveAllParticipants");
    }

    if (
      conversation.isGroup &&
      !ConversationDomainService.hasAdminParticipant(remainingParticipants)
    ) {
      throw new BadRequestError("conversations.cannotRemoveTheLastAdmin");
    }

    const deletedParticipantIds = deletedParticipants.map(participant => participant.user);

    await this.conversationRepo.updateConversationParticipants(
      conversation._id,
      [],
      deletedParticipantIds,
    );
  }
}
