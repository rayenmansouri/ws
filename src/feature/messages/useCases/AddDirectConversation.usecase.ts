import { ID } from "./../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ConversationRepo } from "../domain/Conversation.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { VerifyAndFetchUsersUseCase } from "../../users/useCases/verifyUsersExistence.usecase";
import { ConversationMetaData, ConversationParticipant } from "../domain/conversation.entity";
import { ConversationDomainService } from "../domain/Conversation.service";
import { AddConversationRequestDTO } from "../dtos/AddConversationRequest.dto";
import { ConversationMapper } from "../mappers/ConversationMapper";

@injectable()
export class AddDirectConversationUseCase {
  constructor(
    @inject("ConversationRepo")
    private readonly conversationRepo: ConversationRepo,
    @inject("VerifyAndFetchUsersUseCase")
    private readonly verifyAndFetchUsersUseCase: VerifyAndFetchUsersUseCase,
  ) {}

  async execute(
    dto: AddConversationRequestDTO,
  ): Promise<Populate<ConversationMetaData, "participants.user">> {
    await this.validateConversationDomainRules(dto);

    const participantIds = dto.participants.map(participant => participant._id);

    const existingConversation = await this.conversationRepo.findConversationByParticipantIds(
      participantIds,
    );

    if (existingConversation) {
      return existingConversation;
    }

    return this.createNewConversation(dto);
  }

  private async validateConversationDomainRules(dto: AddConversationRequestDTO): Promise<void> {
    const participantIds = dto.participants.map(participant => participant._id);

    if (ConversationDomainService.isParticipant(dto.userId, participantIds)) {
      throw new BadRequestError("Cannot start a conversation with yourself");
    }

    if (
      !ConversationDomainService.isUserAllowedToStartConversation(dto.userType, [
        dto.participants[0].userType,
      ])
    ) {
      throw new BadRequestError("You don't have permission to start a conversation");
    }

    const mappedParticipants = dto.participants.map(p => ({
      user: p._id,
      userType: p.userType,
    }));

    await this.verifyAndFetchUsersUseCase.execute(mappedParticipants);
  }

  private async createNewConversation(
    dto: AddConversationRequestDTO,
  ): Promise<Populate<ConversationMetaData, "participants.user">> {
    const participants: ConversationParticipant[] = ConversationMapper.toParticipants(dto);

    const conversation = await this.conversationRepo.addOne({
      name: null,
      isGroup: false,
      participants,
      seenStatus: {},
    });

    return this.conversationRepo.getConversationWithPopulatedMetaData(conversation._id);
  }
}
