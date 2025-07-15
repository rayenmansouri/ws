import { MessageAttachmentDTO } from "./../dtos/Message.dto";
import { MessageAttachmentMetaData } from "./../domain/messageAttachment.entity";
import { Populate } from "./../../../core/populateTypes";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { FileUpload } from "./../../../helpers/fileUpload";
import { ID } from "./../../../types/BaseEntity";
import { AddMessageAttachmentDTO } from "./../dtos/AddMessageAttachment.dto";
import { FileRequestDTO } from "../../../core/valueObjects/File.vo";

export class MessageAttachmentMapper {
  static toAddMessageAttachmentDTO(
    file: FileRequestDTO,
    public_id: string,
    url: string,
    conversationId: ID,
    messageId: ID,
    tenantId: string,
  ): AddMessageAttachmentDTO {
    return {
      conversation: conversationId,
      message: messageId,
      public_id,
      url,
      sizeInByte: file.size,
      mimetype: file.mimetype,
      name: FileUpload.formatFileOriginalname(file.originalname),
      uploadedAt: getCurrentTimeOfSchool(tenantId),
      type: FileUpload.isMediaFile(file.mimetype) ? "media" : "file",
    };
  }

  static toMessageAttachmentDTO(
    message: Populate<MessageAttachmentMetaData, "conversation" | "message">,
  ): MessageAttachmentDTO {
    return {
      _id: message._id,
      newId: message.newId,
      url: message.url,
      public_id: message.public_id,
      sizeInByte: message.sizeInByte,
      mimetype: message.mimetype,
      name: message.name,
      uploadedAt: message.uploadedAt,
      type: message.type,
      messageId: message.message._id,
      messageNewId: message.message.newId,
      conversationId: message.conversation._id,
      conversationNewId: message.conversation.newId,
    };
  }
}
