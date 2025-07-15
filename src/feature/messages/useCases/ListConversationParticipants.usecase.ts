import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";
import { TConversationRoleEnums } from "../domain/conversation.entity";
import { ConversationRepo } from "../domain/Conversation.repo";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ConversationDomainService } from "../domain/Conversation.service";
import { ListConversationParticipantsRequestDTO } from "../dtos/ListConversationParticipantsRequest.dto";

export type ConversationParticipantDTO = UserProfileDTO & {
  userType: TEndUserEnum;
  role: TConversationRoleEnums;
};

@injectable()
export class ListConversationParticipantsUseCase {
  constructor(@inject("ConversationRepo") private readonly conversationRepo: ConversationRepo) {}

  async execute(
    dto: ListConversationParticipantsRequestDTO,
  ): Promise<ResponseWithPagination<ConversationParticipantDTO>> {
    const { conversationNewId, page, limit, role } = dto;

    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
    );

    const participantIds = conversation.participants.map(participant => participant.user);

    if (!ConversationDomainService.isParticipant(dto.userId, participantIds)) {
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");
    }

    const paginationResponse = await this.conversationRepo.listConversationParticipants(
      conversationNewId,
      { page, limit, role },
    );

    const mappedParticipants = paginationResponse.docs.flatMap(conversation => {
      return conversation.participants.map(participant => {
        const participantDto = UserMapper.toUserProfileDTO(participant.user);
        return {
          ...participantDto,
          userType: participant.userType,
          role: participant.role,
        };
      });
    });

    return {
      docs: mappedParticipants,
      meta: paginationResponse.meta,
    };
  }
}
