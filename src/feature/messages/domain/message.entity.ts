import { MessageLinks } from "./MessageLinks.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { GenerateMetaData } from "./../../../core/populateTypes";
import { BaseEntity, ID } from "./../../../types/BaseEntity";
import { Conversation } from "./conversation.entity";
import { MessageAttachment } from "./messageAttachment.entity";
import { Populate } from "./../../../core/populateTypes";
import { BaseUser } from "../../users/domain/baseUser.entity";

export const SUPPORTED_MESSAGE_FILE_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
  DOCUMENT: "document",
  AUDIO: "audio",
} as const;

export type TSupportedMessagesFileTypeEnums =
  (typeof SUPPORTED_MESSAGE_FILE_TYPE)[keyof typeof SUPPORTED_MESSAGE_FILE_TYPE];

export const MESSAGE_REACTION_ENUM = {
  LIKE: "like",
  care: "care",
  LOVE: "love",
  LAUGH: "laugh",
  ANGRY: "angry",
  SAD: "sad",
  SURPRISED: "surprised",
} as const;

export type TMessageReactionTypeEnum =
  (typeof MESSAGE_REACTION_ENUM)[keyof typeof MESSAGE_REACTION_ENUM];

export type MessageReaction = {
  reactionType: TMessageReactionTypeEnum | null;
  user: ID;
  userType: TEndUserEnum;
  reactedAt: Date;
};

export type Message = {
  conversation: ID;
  sender: ID | null;
  senderType: TEndUserEnum;
  content: string | null;
  replyTo: ID | null;
  sentAt: Date;
  files: ID[];
  media: ID[];
  links: ID | null;
  reactions: MessageReaction[];
  isDeleted: boolean;
} & BaseEntity;

export type PopulatedMessageMetaData = Omit<
  Populate<MessageMetaData, "sender" | "files" | "media" | "links">,
  "replyTo"
> & {
  replyTo: Populate<MessageMetaData, "sender" | "files" | "media" | "links"> | null;
};

export type MessageMetaData = GenerateMetaData<
  Message,
  {
    conversation: Conversation;
    sender: BaseUser;
    replyTo: Message;
    files: MessageAttachment[];
    media: MessageAttachment[];
    links: MessageLinks;
    "reactions.user": BaseUser;
  }
>;
