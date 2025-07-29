import { ClientSession, Connection, PipelineStage } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { MessageRepo } from "../../../feature/messages/domain/Message.repo";
import { MessageAggregationBuilder } from "../aggregations/MessageAggregation";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { Populate } from "./../../../core/populateTypes";
import { InternalError } from "../../../core/ApplicationErrors";
import { ResponseWithPagination } from "../types";
import {
  MessageMetaData,
  PopulatedMessageMetaData,
  TMessageReactionTypeEnum,
} from "./../../../feature/messages/domain/message.entity";
import { LastMessageDTO } from "./../../../feature/messages/dtos/Conversation.dto";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoMessageRepo extends MongoBaseRepo<MessageMetaData> implements MessageRepo {
  constructor(
    @inject("Connection") private connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "message", session);
  }

  async addMessageReactionForUser(
    messageId: ID,
    userType: TEndUserEnum,
    userId: ID,
    reactionType: TMessageReactionTypeEnum,
    tenantId: string,
  ): Promise<void> {
    const query = { _id: messageId };
    const update = MessageAggregationBuilder.buildReactionAddOperation(
      userId,
      reactionType,
      userType,
      tenantId,
    );
    await this.model.updateOne(query, update);
  }

  async deleteMessageReactionOfUser(messageId: ID, userId: ID): Promise<void> {
    const query = { _id: messageId };
    const update = MessageAggregationBuilder.buildReactionRemoveOperation(userId);
    await this.model.updateOne(query, update);
  }

  async updateMessageReactionOfUser(
    messageId: ID,
    userId: ID,
    reactionType: TMessageReactionTypeEnum,
  ): Promise<void> {
    const query = { _id: messageId, "reactions.user": userId };
    const update = MessageAggregationBuilder.buildReactionUpdateOperation(reactionType);
    await this.model.updateOne(query, update);
  }

  async listConversationMessages(
    conversationId: ID,
    options: { page: number; limit: number },
  ): Promise<ResponseWithPagination<PopulatedMessageMetaData>> {
    const result = (await this.findManyWithPagination(
      {
        conversation: conversationId,
        isDeleted: { $exists: true },
      },
      {
        populate: ["sender", "replyTo", "files", "media", "links"],
        advancePopulate: {
          path: "replyTo",
          populate: ["sender", "media", "files", "links"],
          isDeleted: { $exists: true },
        },
        sort: { createdAt: -1 },
        page: options.page,
        limit: options.limit,
      },
    )) as unknown as ResponseWithPagination<PopulatedMessageMetaData>;

    return result;
  }

  async findLastMessagesOfConversations(conversationIds: string[]): Promise<
    {
      conversation: ID;
      lastMessage: LastMessageDTO | null;
      seenStatus: {
        [userId: ID]: {
          userType: TEndUserEnum;
          seenAt: Date;
          message: ID;
        };
      };
    }[]
  > {
    const pipeline: PipelineStage[] = [
      MessageAggregationBuilder.buildConversationMatchStage(conversationIds),
      ...MessageAggregationBuilder.buildLastMessageGroupStage(),
      MessageAggregationBuilder.buildConversationJoinStage(),
      MessageAggregationBuilder.buildSeenStatusAddStage(),
      ...MessageAggregationBuilder.buildMultiUserLookupStage(),
      MessageAggregationBuilder.buildMessageProjectStage(),
    ];

    const messages = await this.model.aggregate(pipeline);

    return messages;
  }

  async findLastMessageOfConversation(
    conversationId: ID,
  ): Promise<MessageMetaData["entity"] | null> {
    return this.model.findOne(
      { conversation: conversationId, isDeleted: { $exists: true } },
      {},
      {
        sort: {
          createdAt: -1,
        },
      },
    );
  }

  async findOneWithPopulatedReactions(
    messageNewId: string,
  ): Promise<Populate<MessageMetaData, "reactions.user" | "conversation"> | null> {
    const [message] = (await this.model.aggregate([
      { $match: { newId: messageNewId } },
      {
        $lookup: {
          from: "conversations",
          localField: "conversation",
          foreignField: "_id",
          as: "conversation",
        },
      },
      { $unwind: "$conversation" },
      { $unwind: "$reactions" },
      ...MessageAggregationBuilder.buildUserLookupStages(),
      MessageAggregationBuilder.buildUserTypeMergeStage(),
      {
        $group: {
          _id: "$_id",
          newId: { $first: "$newId" },
          conversation: { $first: "$conversation" },
          content: { $first: "$content" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          reactions: { $push: "$reactions" },
        },
      },
      {
        $project: {
          _id: 1,
          newId: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          conversation: {
            participants: 1,
          },
          reactions: {
            _id: 1,
            user: {
              _id: 1,
              newId: 1,
              fullName: 1,
              avatar: 1,
            },
            userType: 1,
            reactionType: 1,
          },
        },
      },
    ])) as Populate<MessageMetaData, "reactions.user" | "conversation">[];

    return message;
  }

  async getPopulatedMetaDataMessageByIdOrThrow(messageId: ID): Promise<PopulatedMessageMetaData> {
    const message = (await this.model.findOne(
      { _id: messageId, isDeleted: { $exists: true } },
      {},
      {
        populate: ["sender", "files", "media", "links"],
      },
    )) as PopulatedMessageMetaData;

    if (message && !message.replyTo)
      return {
        ...message,
        replyTo: null,
      };
    else {
      if (message.replyTo) {
        const replyTo = (await this.model.findOne(
          { _id: message.replyTo, isDeleted: { $exists: true } },
          {},
          {
            populate: ["sender", "files", "media", "links"],
          },
        )) as Populate<MessageMetaData, "sender" | "files" | "media" | "links"> | null;

        return {
          ...message,
          replyTo,
        };
      } else throw new InternalError("something went wrong");
    }
  }
}
