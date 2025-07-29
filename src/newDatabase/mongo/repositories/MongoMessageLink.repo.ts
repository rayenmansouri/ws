import { Populate } from "./../../../core/populateTypes";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { MessageLinksMetaData } from "../../../feature/messages/domain/MessageLinks.entity";
import { MessageLinksRepo } from "../../../feature/messages/domain/MessageLinks.repo";
import { ID } from "./../../../types/BaseEntity";
import { ListOptions } from "./../../../types/types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";

export class MongoMessageLinksRepo
  extends MongoBaseRepo<MessageLinksMetaData>
  implements MessageLinksRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "messageLinks", session);
  }

  async listConversationLinks(
    conversationId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<MessageLinksMetaData, "conversation" | "message">>> {
    const result = await this.findManyWithPagination(
      { conversation: conversationId, isDeleted: false },
      {
        sort: { createdAt: -1 },
        populate: ["conversation", "message"],
        advancePopulate: {
          path: "message",
          isDeleted: { $exists: true },
        },
        ...options,
      },
    );
    return result;
  }

  async deleteMessageLinksOfMessage(messageId: ID): Promise<void> {
    await this.model.updateOne(
      { message: messageId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { session: this.session },
    );
  }
}
