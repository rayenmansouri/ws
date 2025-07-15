import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ConversationParticipant } from "./../domain/conversation.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { VerifyAndFetchUsersUseCase } from "../../users/useCases/verifyUsersExistence.usecase";
import { ConversationRepo } from "../domain/Conversation.repo";
import { ConversationDomainService } from "../domain/Conversation.service";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AddParticipantsToConversationDTO } from "./../dtos/AddParticipantToConversationRequest.dto";
import { CONVERSATION_ROLE } from "./../domain/conversation.entity";

@injectable()
export class AddParticipantsToConversationUseCase {
  constructor(
    @inject("ConversationRepo") private readonly conversationRepo: ConversationRepo,
    @inject("VerifyAndFetchUsersUseCase")
    private verifyAndFetchUsersUseCase: VerifyAndFetchUsersUseCase,
  ) {}

  async execute(dto: AddParticipantsToConversationDTO): Promise<void> {
    const participantsIdsToBeAdded = dto.participants.map(participant => participant.user);

    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      dto.conversationNewId,
      "notFound.conversation",
    );

    if (
      !ConversationDomainService.isParticipantHasAdminRoleInGroup(
        dto.userId,
        conversation.participants,
      )
    )
      throw new BadRequestError("conversations.youAreNotAdminInsideThisGroup");

    if (
      participantsIdsToBeAdded.length > 1 &&
      ConversationDomainService.isParticipantDuplicated(participantsIdsToBeAdded)
    ) {
      throw new BadRequestError("conversations.alreadyParticipating");
    }

    const allParticipants = [
      ...conversation.participants.map(p => p.user),
      ...participantsIdsToBeAdded,
    ];

    if (!ConversationDomainService.hasMinimumParticipants(allParticipants)) {
      throw new BadRequestError("conversations.groupConversationMinimumTwoParticipants");
    }

    const categorizedUsers = this.verifyAndFetchUsersUseCase.categorizeUsers(dto.participants);
    await this.verifyAndFetchUsersUseCase.fetchAndValidateParticipants(categorizedUsers);

    const currentParticipantIds = new Set(conversation.participants.map(p => p.user));
    const addedParticipants = dto.participants.filter(
      participant => !currentParticipantIds.has(participant.user),
    );

    if (addedParticipants.length !== dto.participants.length) {
      throw new BadRequestError("conversations.alreadyParticipating");
    }
    const updatedParticipants: ConversationParticipant[] = addedParticipants.map(participant => ({
      user: participant.user,
      userType: participant.userType,
      joinedAt: getCurrentTimeOfSchool(dto.tenantId),
      role: CONVERSATION_ROLE.USER,
    }));

    await this.conversationRepo.updateConversationParticipants(
      conversation._id,
      updatedParticipants,
      [],
    );
  }
}
