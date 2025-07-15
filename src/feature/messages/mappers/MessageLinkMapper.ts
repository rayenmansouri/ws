import { Populate } from "./../../../core/populateTypes";
import { MessageLinksMetaData } from "./../domain/MessageLinks.entity";
import { MessageLinkDTO } from "./../dtos/Message.dto";

export class MessageLinkMapper {
  static toMessageLinkDTO(
    messageLink: Populate<MessageLinksMetaData, "conversation" | "message">,
  ): MessageLinkDTO {
    return {
      _id: messageLink._id,
      links: messageLink.urls,
      newId: messageLink.newId,
      messageId: messageLink.message._id,
      messageNewId: messageLink.message.newId,
      conversationId: messageLink.conversation._id,
      conversationNewId: messageLink.conversation.newId,
    };
  }
}
