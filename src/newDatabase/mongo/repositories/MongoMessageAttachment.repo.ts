import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { MessageAttachmentRepo } from "../../../feature/messages/domain/MessageAttachment.repo";
import { ListOptions } from "../../../types/types";
import { Populate } from "./../../../core/populateTypes";
import { MessageAttachmentMetaData } from "./../../../feature/messages/domain/messageAttachment.entity";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";

export class MongoMessageAttachmentRepo
  extends MongoBaseRepo<MessageAttachmentMetaData>
  implements MessageAttachmentRepo
{
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "messageAttachment", session);
  }

  async listConversationMultimedia(
    conversationId: ID,
    type: "file" | "media",
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<MessageAttachmentMetaData, "conversation" | "message">>
  > {
    const data = (await this.findManyWithPagination(
      {
        conversation: conversationId,
        type,
      },
      {
        sort: { uploadedAt: -1 },
        populate: ["conversation", "message"],
        ...options,
      },
    )) as unknown as ResponseWithPagination<
      Populate<MessageAttachmentMetaData, "conversation" | "message">
    >;
    return data;
  }

  async deleteManyByMessageId(messageId: ID): Promise<void> {
    await this.model.deleteMany(
      {
        message: messageId,
      },
      {
        session: this.session,
      },
    );
  }
}
