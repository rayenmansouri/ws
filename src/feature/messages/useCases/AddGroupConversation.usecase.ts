import { UserMapper } from "./../../users/mappers/User.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { VerifyAndFetchUsersUseCase } from "../../users/useCases/verifyUsersExistence.usecase";
import { ConversationRepo } from "../domain/Conversation.repo";
import { ConversationDomainService } from "../domain/Conversation.service";
import { MessageRepo } from "../domain/Message.repo";
import { EMPTY_RESPONSE_WITH_PAGINATION } from "./../../../constants/emptyResponseWithPagination";
import { AddGroupConversationDTO } from "./../dtos/AddGroupConversationRequest.dto";
import { ConversationDTO } from "./../dtos/Conversation.dto";
import { MessageDTO } from "./../dtos/Message.dto";
import { ConversationMapper } from "./../mappers/ConversationMapper";

@injectable()
export class AddGroupConversationUseCase {
  constructor(
    @inject("ConversationRepo") private readonly conversationRepo: ConversationRepo,
    @inject("VerifyAndFetchUsersUseCase")
    private readonly verifyAndFetchUsersUseCase: VerifyAndFetchUsersUseCase,
    @inject("MessageRepo") private readonly messageRepo: MessageRepo,
  ) {}

  async execute(dto: AddGroupConversationDTO): Promise<{
    isNewConversation: boolean;
    conversation: ConversationDTO;
    messages: ResponseWithPagination<MessageDTO>;
  }> {
    const usersWithUserType = ConversationMapper.toUserWithUserType([...dto.participants]);

    const allParticipants = ConversationMapper.toConversationParticipants(
      usersWithUserType,
      { id: dto.creatorId, type: dto.creatorType },
      dto.tenantId,
    );

    const participantIds = allParticipants.map(participant => participant.user);

    const targetUserTypes = dto.participants.map(participant => participant.userType);

    if (
      !ConversationDomainService.isUserAllowedToStartConversation(dto.creatorType, targetUserTypes)
    )
      //eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new BadRequestError("conversations.youAreNotAllowedToStartConversation");

    if (ConversationDomainService.isParticipantDuplicated(participantIds)) {
      //eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new BadRequestError("conversations.duplicateParticipants");
    }

    if (!ConversationDomainService.hasMinimumParticipants(participantIds)) {
      //eslint-disable-next-line @typescript-eslint/only-throw-error
      throw new BadRequestError("conversations.groupConversationMinimumTwoParticipants");
    }

    const categorizedUsers = this.verifyAndFetchUsersUseCase.categorizeUsers(usersWithUserType);
    await this.verifyAndFetchUsersUseCase.fetchAndValidateParticipants(categorizedUsers);

    const existingConversation = await this.conversationRepo.findConversationByParticipantIds(
      participantIds,
    );

    if (existingConversation) {
      const conversation = await this.conversationRepo.getConversationWithPopulatedMetaData(
        existingConversation._id,
      );

      const messages = await this.messageRepo.listConversationMessages(conversation._id, {
        page: 1,
        limit: 10,
      });
      const mappedMessages = messages.docs.map(message => ConversationMapper.toMessageDTO(message));

      const mappedLastMessage =
        messages.docs.length > 0
          ? ConversationMapper.toLastMessageDTO(
              {
                _id: messages.docs[0]._id,
                newId: messages.docs[0].newId,
                senderId: messages.docs[0].sender ? messages.docs[0].sender._id : null,
                content: messages.docs[0].content,
                sentAt: messages.docs[0].sentAt,
                files: messages.docs[0].files.map(file => file._id),
                media: messages.docs[0].media.map(media => media._id),
                isDeleted: messages.docs[0].isDeleted,
              },
              messages.docs[0].sender ? messages.docs[0].sender.fullName : null,
              [],
            )
          : null;

      const mappedConversation = ConversationMapper.toConversationDTO({
        conversation: {
          _id: conversation._id,
          newId: conversation.newId,
          name: conversation.name,
          isGroup: conversation.isGroup,
          participants: conversation.participants.map(participant => {
            return {
              user: {
                ...UserMapper.toUserProfileDTO(participant.user),
                userType: participant.userType,
              },
            };
          }),
        },
        lastMessage: mappedLastMessage,
        userId: dto.creatorId,
      });
      return {
        isNewConversation: false,
        conversation: mappedConversation,
        messages: { docs: mappedMessages, meta: messages.meta },
      };
    }

    const newGroupConversation = await this.conversationRepo.createGroupConversation(
      allParticipants,
    );

    const conversation = await this.conversationRepo.getConversationWithPopulatedMetaData(
      newGroupConversation._id,
    );

    const mappedConversation = ConversationMapper.toConversationDTO({
      conversation: {
        _id: conversation._id,
        newId: conversation.newId,
        name: conversation.name,
        isGroup: conversation.isGroup,
        participants: conversation.participants.map(participant => {
          return {
            user: {
              ...UserMapper.toUserProfileDTO(participant.user),
              userType: participant.userType,
            },
          };
        }),
      },
      lastMessage: null,
      userId: dto.creatorId,
    });

    return {
      isNewConversation: true,
      conversation: mappedConversation,
      messages: EMPTY_RESPONSE_WITH_PAGINATION<MessageDTO>(),
    };
  }
}
