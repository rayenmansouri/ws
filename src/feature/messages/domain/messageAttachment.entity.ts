import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { ID } from "./../../../types/BaseEntity";
import { Conversation } from "./conversation.entity";
import { Message } from "./message.entity";

export type MessageAttachment = {
  conversation: ID;
  message: ID;
  url: string;
  public_id: string;
  sizeInByte: number;
  mimetype: string;
  name: string;
  uploadedAt: Date;
  type: "file" | "media";
  isDeleted: boolean;
  deletedAt: Date | null;
} & BaseEntity;

export type MessageAttachmentMetaData = GenerateMetaData<
  MessageAttachment,
  {
    conversation: Conversation;
    message: Message;
  }
>;
