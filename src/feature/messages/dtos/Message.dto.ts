import { LastMessageDTO } from "./Conversation.dto";
import { TMessageReactionTypeEnum } from "./../domain/message.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";
import { ID } from "../../../types/BaseEntity";
import { FileDTO } from "../../../core/valueObjects/File.vo";

export type MessageDTO = {
  _id: ID;
  newId: string;
  sender: (UserProfileDTO & { userType: TEndUserEnum }) | null;
  content: string | null;
  files: FileDTO[];
  media: FileDTO[];
  links: string[];
  isReply: boolean;
  replyTo: ReplyDTO | null;
  reactions: ReactionSummaryDTO[];
  conversationId: ID;
  seenBy: (UserProfileDTO & { userType: TEndUserEnum; seenAt: Date })[];
  isDeleted: boolean;
};
export type MessageAttachmentDTO = {
  _id: ID;
  newId: string;
  url: string;
  public_id: string;
  sizeInByte: number;
  mimetype: string;
  name: string;
  uploadedAt: Date;
  type: "file" | "media";
  messageId: ID;
  messageNewId: string;
  conversationId: ID;
  conversationNewId: string;
};

export type MessageLinkDTO = {
  _id: ID;
  newId: string;
  links: string[];
  messageId: ID;
  messageNewId: string;
  conversationId: ID;
  conversationNewId: string;
};

export type ReplyDTO = {
  _id: ID;
  newId: string;
  content: string | null;
  files: FileDTO[];
  media: FileDTO[];
  links: string[];
  sender: {
    _id: ID;
    newId: string;
    fullName: string;
  } | null;
  isDeleted: boolean;
};

export type ReactionSummaryDTO = {
  reactionType: TMessageReactionTypeEnum;
  userId: ID;
};
export type seenStatusDTO = {
  [userId: ID]: {
    userType: TEndUserEnum;
    seenAt: Date;
    message: ID;
  };
};
export type lastMessageOfConversation = {
  conversation: ID;
  seenStatus: seenStatusDTO;
  lastMessage: LastMessageDTO | null;
};
