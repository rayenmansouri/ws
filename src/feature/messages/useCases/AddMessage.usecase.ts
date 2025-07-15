import { FileUpload } from "./../../../helpers/fileUpload";
import { FileUploadPayload } from "./../../../core/fileManager/FileManager";
import { injectable } from "inversify";
import { Connection } from "mongoose";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { FileRequestDTO } from "../../../core/valueObjects/File.vo";
import { ConversationMetaData, TConversationRoleEnums } from "../domain/conversation.entity";
import { ConversationRepo } from "../domain/Conversation.repo";
import { MessageRepo } from "../domain/Message.repo";
import { MessageAttachmentRepo } from "../domain/MessageAttachment.repo";
import { MessageLinksRepo } from "../domain/MessageLinks.repo";
import { AddMessageRequestDTO } from "../dtos/AddMessageRequest.dto";
import { NewMessageEvent } from "../events/newMessage.event";
import { END_USER_ENUM, TEndUserEnum } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { ConversationDomainService } from "./../domain/Conversation.service";
import { Message, PopulatedMessageMetaData } from "./../domain/message.entity";
import { MessageAttachment } from "./../domain/messageAttachment.entity";
import { MessageLinks } from "./../domain/MessageLinks.entity";
import { AddGroupConversationDTO } from "./../dtos/AddGroupConversationRequest.dto";
import { AddMessageAttachmentDTO } from "./../dtos/AddMessageAttachment.dto";
import { ConversationDTO, LastMessageDTO } from "./../dtos/Conversation.dto";
import { MessageDTO } from "./../dtos/Message.dto";
import { ConversationMapper } from "./../mappers/ConversationMapper";
import { MessageAttachmentMapper } from "./../mappers/MessageAttachmentMapper";
import { AddDirectConversationUseCase } from "./AddDirectConversation.usecase";
import { AddGroupConversationUseCase } from "./AddGroupConversation.usecase";

@injectable()
export class AddMessageUseCase {
  constructor(
    @inject("ConversationRepo") private readonly conversationRepo: ConversationRepo,
    @inject("MessageRepo") private readonly messageRepo: MessageRepo,
    @inject("FileManager") private readonly fileManager: FileManager,
    @inject("MessageAttachmentRepo") private readonly messageAttachmentRepo: MessageAttachmentRepo,
    @inject("AddDirectConversationUseCase")
    private readonly addDirectConversationUseCase: AddDirectConversationUseCase,
    @inject("Connection") private readonly connection: Connection,
    @inject("MessageLinksRepo") private readonly messageLinksRepo: MessageLinksRepo,
    @inject("AddGroupConversationUseCase")
    private readonly addGroupConversationUseCase: AddGroupConversationUseCase,
  ) {}

  async execute(addMessageRequestDto: AddMessageRequestDTO): Promise<{
    message: MessageDTO;
    conversation: ConversationDTO;
    isNewConversation: boolean;
    allParticipants: { id: ID; userType: TEndUserEnum }[];
  }> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const { conversation, isNewConversation } = await this.initializeConversation(
        addMessageRequestDto,
      );

      const newMessage = await this.createMessage(addMessageRequestDto, conversation._id);
      const { mediaIds, fileIds } = await this.processAttachments(
        addMessageRequestDto,
        conversation._id,
        newMessage._id,
      );

      const [{ conversationDto, lastMessage, userInformation }, __, messageLinks] =
        await Promise.all([
          this.prepareDTOs(
            addMessageRequestDto,
            {
              _id: conversation._id,
              isGroup: conversation.isGroup,
              name: conversation.name,
              newId: conversation.newId,
              participants: conversation.participants,
            },
            {
              ...newMessage,
              files: fileIds,
              media: mediaIds,
            },
          ),
          this.updateConversationStatus(addMessageRequestDto, conversation._id, newMessage._id),
          this.createLinks(addMessageRequestDto.links, conversation._id, newMessage._id),
        ]);

      if (messageLinks) {
        await this.messageRepo.updateOneById(newMessage._id, {
          links: messageLinks._id,
        });
      }

      await session.commitTransaction();

      const populatedMessage = await this.messageRepo.getPopulatedMetaDataMessageByIdOrThrow(
        newMessage._id,
      );

      const messageDto = ConversationMapper.toMessageDTO(populatedMessage);

      this.notifyParticipants(
        {
          name: conversation.name,
          isGroup: conversation.isGroup,
          newId: conversation.newId,
          _id: conversation._id,
          participants: conversation.participants,
        },
        addMessageRequestDto,
        populatedMessage,
        lastMessage,
        userInformation,
      );

      const allParticipants = conversation.participants.map(participant => {
        return {
          id: participant.user._id,
          userType: participant.userType,
        };
      });

      return {
        allParticipants,
        message: {
          ...messageDto,
          seenBy: [userInformation],
        },
        conversation: conversationDto,
        isNewConversation,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private async initializeConversation(dto: AddMessageRequestDTO) {
    const { conversation, isNewConversation } = await this.getOrCreateConversation(dto);
    return { conversation, isNewConversation };
  }

  private async createLinks(
    links: string[],
    conversation: ID,
    message: ID,
  ): Promise<MessageLinks | null> {
    let messageLinks: MessageLinks | null = null;
    if (links.length > 0) {
      messageLinks = await this.messageLinksRepo.addOne({
        conversation,
        message,
        urls: links,
        isDeleted: false,
        deletedAt: null,
      });
    }
    return messageLinks;
  }

  private async createMessage(dto: AddMessageRequestDTO, conversationId: ID) {
    const replyToMessageId = await this.getReplyMessageId(conversationId, dto.replyTo);
    const sentAt = getCurrentTimeOfSchool(dto.tenantId);

    const newMessage = await this.createInitialMessage(
      dto,
      conversationId,
      replyToMessageId,
      sentAt,
    );

    return newMessage;
  }

  private async processAttachments(dto: AddMessageRequestDTO, conversationId: ID, messageId: ID) {
    const attachmentResults = await this.uploadAttachments(dto, conversationId, messageId);
    await this.updateMessageAttachments(messageId, attachmentResults);
    return { mediaIds: attachmentResults.mediaIds, fileIds: attachmentResults.fileIds };
  }

  private async prepareDTOs(
    dto: AddMessageRequestDTO,
    conversation: {
      participants: { user: UserProfileDTO & { userType: TEndUserEnum } }[];
      isGroup: boolean;
      name: string | null;
      _id: ID;
      newId: string;
    },
    message: Message,
  ) {
    const populatedMessage = await this.messageRepo.getPopulatedMetaDataMessageByIdOrThrow(
      message._id,
    );
    const lastMessage = this.createLastMessageDTO(message, dto.fullName);
    const conversationDto = this.createConversationDTO(conversation, lastMessage, dto.userId);
    const messageDto = ConversationMapper.toMessageDTO(populatedMessage);
    const userInformation = this.createUserInformation(dto);

    return {
      messageDto,
      conversationDto,
      userInformation,
      lastMessage,
      populatedMessage,
    };
  }

  private async updateConversationStatus(
    dto: AddMessageRequestDTO,
    conversationId: ID,
    messageId: ID,
  ) {
    await this.conversationRepo.updateSeenStatus(
      conversationId,
      dto.userId,
      messageId,
      dto.userType,
      dto.tenantId,
    );
  }

  private async getOrCreateConversation(dto: AddMessageRequestDTO): Promise<{
    conversation: Omit<
      Pick<ConversationMetaData["entity"], "_id" | "isGroup" | "name" | "newId">,
      "participants"
    > & {
      participants: {
        user: UserProfileDTO & { userType: TEndUserEnum };
        userType: TEndUserEnum;
        joinedAt: Date;
        role: TConversationRoleEnums;
      }[];
    };
    isNewConversation: boolean;
  }> {
    let conversation;

    if (!dto.conversationNewId) {
      const participantIds = dto.participants.map(participant => participant._id);

      conversation = await this.conversationRepo.findConversationByParticipantIds([
        ...participantIds,
        dto.userId,
      ]);

      if (conversation) {
        return {
          conversation: {
            ...conversation,
            participants: conversation.participants.map(participant => ({
              user: {
                ...UserMapper.toUserProfileDTO(participant.user),
                userType: participant.userType,
              },
              userType: participant.userType,
              joinedAt: participant.joinedAt,
              role: participant.role,
            })),
          },
          isNewConversation: false,
        };
      }
    } else {
      conversation = await this.conversationRepo.findOneByNewIdOrThrow(
        dto.conversationNewId,
        "notFound.conversation",
        {
          populate: ["participants.user"],
        },
      );

      return {
        conversation: {
          ...conversation,
          participants: conversation.participants.map(participant => {
            return {
              user: {
                ...UserMapper.toUserProfileDTO(participant.user),
                userType: participant.userType,
              },
              userType: participant.userType,
              joinedAt: participant.joinedAt,
              role: participant.role,
            };
          }),
        },
        isNewConversation: false,
      };
    }

    if (dto.participants.length === 1) {
      const addDirectConversationDto = {
        participants: dto.participants,
        schoolId: dto.tenantId,
        userType: dto.userType,
        userId: dto.userId,
      };

      const newConversation = await this.addDirectConversationUseCase.execute(
        addDirectConversationDto,
      );
      return {
        conversation: {
          _id: newConversation._id,
          isGroup: newConversation.isGroup,
          newId: newConversation.newId,
          name: newConversation.name,
          participants: newConversation.participants.map(participant => {
            return {
              user: {
                ...UserMapper.toUserProfileDTO(participant.user),
                userType: participant.userType,
              },
              userType: participant.userType,
              joinedAt: participant.joinedAt,
              role: participant.role,
            };
          }),
        },
        isNewConversation: true,
      };
    } else {
      const addGroupConversationDto: AddGroupConversationDTO = {
        participants: dto.participants
          .map(participant => {
            return { user: participant._id, userType: participant.userType };
          })
          .concat({ user: dto.userId, userType: dto.userType }),
        creatorId: dto.userId,
        creatorType: dto.userType,
        tenantId: dto.tenantId,
      };

      const newConversation = await this.addGroupConversationUseCase.execute(
        addGroupConversationDto,
      );

      return {
        conversation: {
          _id: newConversation.conversation._id,
          isGroup: newConversation.conversation.isGroup,
          newId: newConversation.conversation.newId,
          name: newConversation.conversation.name,
          participants: newConversation.conversation.participants.map(participant => {
            return {
              user: participant,
              userType: participant.userType,
              joinedAt: new Date(),
              role: participant.userType === END_USER_ENUM.ADMIN ? "ADMIN" : "USER",
            };
          }),
        },
        isNewConversation: true,
      };
    }
  }

  private createLastMessageDTO(message: Message, senderFullName: string): LastMessageDTO {
    return ConversationMapper.toLastMessageDTO(
      {
        _id: message._id,
        newId: message.newId,
        senderId: message.sender,
        content: message.content,
        sentAt: message.sentAt,
        files: message.files,
        media: message.media,
        isDeleted: message.isDeleted,
      },
      senderFullName,
      [],
    );
  }

  private createConversationDTO(
    conversation: {
      participants: { user: UserProfileDTO & { userType: TEndUserEnum } }[];
      isGroup: boolean;
      name: string | null;
      _id: ID;
      newId: string;
    },
    lastMessage: LastMessageDTO,
    userId: ID,
  ): ConversationDTO {
    return ConversationMapper.toConversationDTO({
      conversation,
      lastMessage,
      userId,
    });
  }

  private createUserInformation(dto: AddMessageRequestDTO) {
    return {
      _id: dto.userId,
      newId: dto.userNewId,
      fullName: dto.fullName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      avatar: dto.avatar,
      userType: dto.userType,
      seenAt: getCurrentTimeOfSchool(dto.tenantId),
    };
  }

  private validateUserParticipation(userId: ID, participantIds: ID[]): void {
    if (!ConversationDomainService.isParticipant(userId, participantIds)) {
      throw new BadRequestError("messages.youAreNotPartOfThisConversation");
    }
  }

  private async getReplyMessageId(
    conversationId: ID | null,
    replyToId?: string,
  ): Promise<ID | null> {
    if (!replyToId) return null;

    const replyMessage = await this.messageRepo.findOneByNewIdOrThrow(
      replyToId,
      "notFound.message",
    );
    if (replyMessage.conversation !== conversationId) {
      throw new InternalError("messages.replyToMessageDoesNotBelongToThisConversation");
    }

    return replyMessage._id;
  }

  private async createInitialMessage(
    messageRequest: AddMessageRequestDTO,
    conversationId: ID,
    replyToId: ID | null,
    sentAt: Date,
  ): Promise<Message> {
    return this.messageRepo.addOne({
      conversation: conversationId,
      sender: messageRequest.userId,
      content: messageRequest.content || null,
      replyTo: replyToId,
      sentAt,
      files: [],
      media: [],
      links: null,
      senderType: messageRequest.userType,
      reactions: [],
      isDeleted: false,
    });
  }

  private async uploadAttachments(
    messageRequest: AddMessageRequestDTO,
    conversationId: ID,
    messageId: ID,
  ): Promise<{ mediaIds: ID[]; fileIds: ID[] }> {
    const [mediaIds, fileIds] = await Promise.all([
      this.handleAttachmentUpload(
        messageRequest.media,
        messageRequest.tenantId,
        conversationId,
        messageId,
        "media",
      ),
      this.handleAttachmentUpload(
        messageRequest.files,
        messageRequest.tenantId,
        conversationId,
        messageId,
        "files",
      ),
    ]);

    return { mediaIds, fileIds };
  }

  private async handleAttachmentUpload(
    files: FileRequestDTO[],
    tenantId: string,
    conversationId: ID,
    messageId: ID,
    folderName: string,
  ): Promise<ID[]> {
    if (!files.length) return [];
    const filePaths = FileUpload.generateFilePaths(files, tenantId, folderName);

    const fileUploadsDto: FileUploadPayload[] = files.map(file => {
      return {
        name: file.originalname,
        buffer: file.buffer,
        mimetype: file.mimetype,
      };
    });

    const uploadResults = await this.fileManager.uploadFiles(fileUploadsDto, filePaths);

    const messageAttachmentPayloads = this.createAttachmentDTOs(
      files,
      uploadResults.map(res => {
        return { path: res.path, link: res.link };
      }),
      conversationId,
      messageId,
      tenantId,
    );

    const attachments = await this.persistMessageAttachments(messageAttachmentPayloads);
    return attachments.map(attachment => attachment._id);
  }

  private createAttachmentDTOs(
    files: FileRequestDTO[],
    uploadResults: { path: string; link: string }[],
    conversationId: ID,
    messageId: ID,
    tenantId: string,
  ): AddMessageAttachmentDTO[] {
    return files.map((file, index) =>
      MessageAttachmentMapper.toAddMessageAttachmentDTO(
        file,
        uploadResults[index].path,
        uploadResults[index].link,
        conversationId,
        messageId,
        tenantId,
      ),
    );
  }

  private async persistMessageAttachments(
    messageAttachmentPayloads: AddMessageAttachmentDTO[],
  ): Promise<MessageAttachment[]> {
    const messageAttachments = await Promise.all(
      messageAttachmentPayloads.map(payload =>
        this.messageAttachmentRepo.addOne({ ...payload, isDeleted: false, deletedAt: null }),
      ),
    );

    return messageAttachments;
  }

  private async updateMessageAttachments(
    messageId: ID,
    attachments: { mediaIds: ID[]; fileIds: ID[] },
  ): Promise<void> {
    await this.messageRepo.updateOneById(messageId, {
      media: attachments.mediaIds,
      files: attachments.fileIds,
    });
  }

  private notifyParticipants(
    conversation: {
      participants: { user: UserProfileDTO & { userType: TEndUserEnum } }[];
      isGroup: boolean;
      name: string | null;
      _id: ID;
      newId: string;
    },
    addMessageRequestDTO: AddMessageRequestDTO,
    populatedMessage: PopulatedMessageMetaData,
    lastMessage: LastMessageDTO,
    userInformation: UserProfileDTO & { userType: TEndUserEnum; seenAt: Date },
  ): void {
    const participantsIdsWithoutSender = conversation.participants
      .filter(participant => participant.user._id !== userInformation._id)
      .map(participant => participant.user._id);

    for (const participantId of participantsIdsWithoutSender) {
      const messageEvent = new NewMessageEvent(addMessageRequestDTO.tenantId, {
        message: {
          ...ConversationMapper.toMessageDTO(populatedMessage),
          seenBy: [userInformation],
        },
        conversation: ConversationMapper.toConversationDTO({
          conversation,
          lastMessage,
          userId: participantId,
        }),
      });

      const participant = conversation.participants.find(
        participant => participant.user._id === participantId,
      );
      if (!participant) throw new InternalError("participant must be found");

      messageEvent.sendEventToUsers([
        { id: participant.user._id, type: participant.user.userType },
      ]);
    }
  }
}
