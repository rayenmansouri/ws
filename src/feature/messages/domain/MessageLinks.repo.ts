import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "./../../../types/types";
import { ID } from "./../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { MessageLinksMetaData } from "./MessageLinks.entity";

export abstract class MessageLinksRepo extends BaseRepo<MessageLinksMetaData> {
  abstract listConversationLinks(
    conversationId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<MessageLinksMetaData, "conversation" | "message">>>;

  abstract deleteMessageLinksOfMessage(messageId: ID): Promise<void>;
}
