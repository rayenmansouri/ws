import { FileDTO } from "../../../core/valueObjects/File.vo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";
import { UserMapper } from "./../../users/mappers/User.mapper";
import {
  CONVERSATION_ROLE,
  ConversationMetaData,
  ConversationParticipant,
} from "./../domain/conversation.entity";
import { userWithUserType } from "./../domain/Conversation.repo";
import { MessageMetaData, PopulatedMessageMetaData } from "./../domain/message.entity";
import { MessageAttachment } from "./../domain/messageAttachment.entity";
import { AddConversationRequestDTO } from "./../dtos/AddConversationRequest.dto";
import {
  ConversationDTO,
  toConversationDTOParams,
  LastMessageDTO,
} from "./../dtos/Conversation.dto";
import { MessageDTO, ReactionSummaryDTO, ReplyDTO } from "./../dtos/Message.dto";
import { END_USER_ENUM } from "./../../../constants/globalEnums";

export class ConversationMapper {
  static toParticipants(dto: AddConversationRequestDTO): ConversationParticipant[] {
    const participants = dto.participants.map(participant => ({
      user: participant._id,
      userType: participant.userType,
      joinedAt: getCurrentTimeOfSchool(dto.schoolId),
      role: CONVERSATION_ROLE.USER,
    }));

    participants.push({
      user: dto.userId,
      userType: dto.userType,
      joinedAt: getCurrentTimeOfSchool(dto.schoolId),
      role: CONVERSATION_ROLE.USER,
    });

    return participants;
  }

  static toConversationDTO(params: toConversationDTOParams): ConversationDTO {
    const MAX_VISIBLE_PARTICIPANTS = 2;

    const filteredParticipants = params.conversation.participants.filter(
      participant => participant.user._id !== params.userId,
    );

    const displayedParticipants = params.conversation.isGroup
      ? filteredParticipants.slice(0, MAX_VISIBLE_PARTICIPANTS)
      : filteredParticipants;

    let isSeen: boolean = true;
    if (params.lastMessage?.seenBy) {
      isSeen = params.lastMessage.seenBy.some(user => user._id === params.userId);
    }

    return {
      _id: params.conversation._id,
      name: params.conversation.name,
      newId: params.conversation.newId,
      participants: displayedParticipants.map(participant => participant.user),
      lastMessage: params.lastMessage,
      isGroup: params.conversation.isGroup,
      isSeen,
    };
  }

  static toLastMessageDTO(
    message: {
      _id: ID;
      newId: string;
      senderId: ID | null;
      content: string | null;
      sentAt: Date | null;
      files: ID[];
      media: ID[];
      isDeleted: boolean;
    },
    senderFullName: string | null,
    seenBy: (UserProfileDTO & { userType: TEndUserEnum; seenAt: Date })[],
  ): LastMessageDTO {
    return {
      _id: message._id,
      newId: message.newId,
      senderId: message.senderId,
      senderName: senderFullName ?? null,
      content: message.content,
      sentAt: message.sentAt,
      files: message.files,
      media: message.media,
      type: message.files.length > 0 || message.media.length > 0 ? "attachment" : "content",
      seenBy,
      isDeleted: message.isDeleted,
    };
  }

  static toMessageDTO(
    message: PopulatedMessageMetaData,
    conversation?: Populate<ConversationMetaData, "participants.user">,
  ): MessageDTO {
    const reactions: ReactionSummaryDTO[] = message.isDeleted
      ? []
      : message.reactions
          .filter(
            (
              reaction,
            ): reaction is typeof reaction & {
              reactionType: NonNullable<typeof reaction.reactionType>;
            } => reaction.reactionType !== null,
          )
          .map(reaction => {
            return {
              userId: reaction.user,
              reactionType: reaction.reactionType,
            };
          });

    let userDto: (UserProfileDTO & { userType: TEndUserEnum }) | null = null;
    if (message.sender) {
      userDto = {
        ...UserMapper.toUserProfileDTO(message.sender),
        userType: message.senderType,
      };
    }

    return {
      _id: message._id,
      newId: message.newId,
      sender: userDto,
      content: message.isDeleted ? null : message.content,
      files: message.isDeleted ? [] : this.mapFilesOrMedia(message.files),
      media: message.isDeleted ? [] : this.mapFilesOrMedia(message.media),
      links: !message.links || message.isDeleted ? [] : message.links?.urls,
      isReply: !!message.replyTo,
      replyTo: message.isDeleted ? null : this.mapReply(message.replyTo),
      reactions,
      conversationId: message.conversation,
      seenBy: this.toSeenStatus(message._id, conversation),
      isDeleted: message.isDeleted,
    };
  }

  static toSeenStatus(
    messageId: ID,
    conversation?: Populate<ConversationMetaData, "participants.user">,
  ): (UserProfileDTO & { userType: TEndUserEnum; seenAt: Date })[] {
    if (!conversation?.seenStatus) {
      return [];
    }
    const seenBy = Object.entries(conversation.seenStatus)
      .filter(([_, status]) => status.message === messageId)
      .map(([userId, seenMetaData]) => {
        const user = conversation.participants.find(participant => participant.user._id === userId);
        let userDTO;
        if (user?.user) {
          userDTO = UserMapper.toUserProfileDTO(user?.user);
          return {
            ...userDTO,
            userType: seenMetaData.userType,
            seenAt: seenMetaData.seenAt,
          };
        }
      })
      .filter((user): user is NonNullable<typeof user> => user !== null);

    return seenBy;
  }

  private static mapFilesOrMedia(filesOrMedia: MessageAttachment[]): FileDTO[] {
    return filesOrMedia.map(file => ({
      path: file.public_id,
      name: file.name,
      mimetype: file.mimetype,
      sizeInByte: file.sizeInByte,
      url: file.url,
      uploadedAt: file.uploadedAt,
    }));
  }

  private static mapReply(
    replyTo: Populate<MessageMetaData, "files" | "media" | "sender" | "links"> | null,
  ): ReplyDTO | null {
    if (!replyTo) return null;
    return {
      _id: replyTo._id,
      newId: replyTo.newId,
      content: replyTo.isDeleted ? null : replyTo.content,
      files: replyTo.isDeleted ? [] : this.mapFilesOrMedia(replyTo.files),
      media: replyTo.isDeleted ? [] : this.mapFilesOrMedia(replyTo.media),
      links: replyTo.isDeleted || !replyTo.links ? [] : replyTo.links.urls,
      sender: replyTo.sender
        ? {
            _id: replyTo.sender._id,
            newId: replyTo.sender.newId,
            fullName: replyTo.sender.fullName,
          }
        : null,
      isDeleted: replyTo.isDeleted,
    };
  }

  public static CategorizeParticipantsByUserType(
    participants: { userType: TEndUserEnum; _id: ID }[],
  ): Record<TEndUserEnum, ID[]> {
    const result: Record<TEndUserEnum, ID[]> = {
      [END_USER_ENUM.ADMIN]: [],
      [END_USER_ENUM.TEACHER]: [],
      [END_USER_ENUM.STUDENT]: [],
      [END_USER_ENUM.PARENT]: [],
      [END_USER_ENUM.MASTER]: [],
    };

    participants.forEach(participant => {
      result[participant.userType].push(participant._id);
    });

    return result;
  }

  static toConversationParticipants(
    participants: userWithUserType[],
    creator: { id: ID; type: TEndUserEnum },
    tenantId: string,
  ): ConversationParticipant[] {
    const joinedAt = getCurrentTimeOfSchool(tenantId);

    const creatorParticipant: ConversationParticipant = {
      user: creator.id,
      userType: creator.type,
      joinedAt,
      role: CONVERSATION_ROLE.ADMIN,
    };

    const otherParticipants: ConversationParticipant[] = participants
      .filter(participant => participant.user !== creator.id)
      .map(participant => ({
        user: participant.user,
        userType: participant.userType,
        joinedAt,
        role: CONVERSATION_ROLE.USER,
      }));

    return [creatorParticipant, ...otherParticipants];
  }

  static toUserWithUserType(
    participants: userWithUserType[],
    excludeUserType?: TEndUserEnum,
  ): userWithUserType[] {
    return participants
      .filter(p => !excludeUserType || p.userType !== excludeUserType)
      .map(p => ({
        user: p.user,
        userType: p.userType,
      }));
  }
}
