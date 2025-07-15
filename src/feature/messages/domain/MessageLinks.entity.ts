import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { ID } from "./../../../types/BaseEntity";
import { Conversation } from "./conversation.entity";
import { Message } from "./message.entity";

export type MessageLinks = {
  conversation: ID;
  message: ID;
  urls: string[];
  isDeleted: boolean;
  deletedAt: Date | null;
} & BaseEntity;

export type MessageLinksMetaData = GenerateMetaData<
  MessageLinks,
  {
    conversation: Conversation;
    message: Message;
  }
>;
