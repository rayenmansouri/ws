import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { MessageAttachmentMetaData } from "./messageAttachment.entity";
import { ListOptions } from "../../../types/types";

export abstract class MessageAttachmentRepo extends BaseRepo<MessageAttachmentMetaData> {
  abstract listConversationMultimedia(
    conversationId: ID,
    type: "file" | "media",
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<MessageAttachmentMetaData, "conversation" | "message">>
  >;

  abstract deleteManyByMessageId(messageId: ID): Promise<void>;
}
