import { ClientSession, Connection, PipelineStage, Types, UpdateQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ConversationRepo } from "../../../feature/messages/domain/Conversation.repo";
import { ListOptions } from "../../../types/types";
import { ConversationAggregationBuilder } from "../aggregations/ConversationAggregation";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { Populate } from "./../../../core/populateTypes";
import {
  Conversation,
  ConversationMetaData,
  ConversationParticipant,
  TConversationRoleEnums,
} from "./../../../feature/messages/domain/conversation.entity";
import { ID } from "./../../../types/BaseEntity";
import {
  FindOneConversationByParticipantIdsQueryType,
  PaginationOptions,
  UserConversationFilter,
} from "./../types/MongoConversation.types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { PaginationMeta, ResponseWithPagination } from "../types";

export class MongoConversationRepo
  extends MongoBaseRepo<ConversationMetaData>
  implements ConversationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "conversation", session);
  }

  private async findOneByParticipantIds(
    participantIds: ID[],
    options?: { isGroup?: boolean },
  ): Promise<Populate<ConversationMetaData, "participants.user"> | null> {
    const query: FindOneConversationByParticipantIdsQueryType = {
      $and: [
        {
          "participants.user": {
            $all: participantIds,
          },
        },
      ],
    };

    query.$and.push({
      participants: {
        $size: participantIds.length,
        $not: {
          $elemMatch: {
            user: { $nin: participantIds },
          },
        },
      },
    });

    if (options?.isGroup === false) {
      query.$and.push({ isGroup: false });
    } else if (options?.isGroup === true) {
      query.$and.push({ isGroup: true });
    }

    const conversation = (await this.model.findOne(
      query,
      {},
      {
        populate: ["participants.user"],
      },
    )) as unknown as Promise<Populate<ConversationMetaData, "participants.user"> | null>;

    return conversation;
  }

  private async findDirectConversation(
    participantIds: ID[],
  ): Promise<Populate<ConversationMetaData, "participants.user"> | null> {
    return this.findOneByParticipantIds(participantIds, { isGroup: false });
  }

  private async findGroupConversation(
    participantIds: ID[],
  ): Promise<Populate<ConversationMetaData, "participants.user"> | null> {
    return this.findOneByParticipantIds(participantIds, { isGroup: true });
  }

  async findConversationByParticipantIds(
    participantIds: ID[],
  ): Promise<Populate<ConversationMetaData, "participants.user"> | null> {
    if (participantIds.length === 2) {
      const directConversation = await this.findDirectConversation(participantIds);
      if (directConversation) return directConversation;
    }

    if (participantIds.length > 2) return this.findGroupConversation(participantIds);

    return null;
  }

  async getConversationWithPopulatedMetaData(
    conversationId: ID,
  ): Promise<Populate<ConversationMetaData, "participants.user">> {
    const conversation = await this.findOneByIdOrThrow(conversationId, "notFound.conversation", {
      populate: ["participants.user"],
    });

    return conversation;
  }

  private async getTotalConversationsCount(
    userId: ID,
    isGroup?: boolean,
    search?: string,
  ): Promise<number> {
    const pipeline = this.buildGetConversationsAggregationPipeline(
      userId,
      0,
      null,
      search,
      isGroup,
    );

    const countPipeline = [...pipeline, { $count: "total" }];

    const result = await this.model.aggregate(countPipeline);
    return result[0]?.total || 0;
  }

  private buildGetConversationsAggregationPipeline(
    userId: ID,
    skip: number,
    limit: number | null,
    search?: string,
    isGroup?: boolean,
  ): PipelineStage[] {
    const pipeline: PipelineStage[] = [
      ConversationAggregationBuilder.buildParticipantMatchStage(userId, isGroup),
      { $unwind: "$participants" },
      ...ConversationAggregationBuilder.buildParticipantUserLookupStages(),
      ConversationAggregationBuilder.buildUserTypeMergeStage(),
      ConversationAggregationBuilder.buildConversationGroupStage(),
    ];

    if (search) {
      pipeline.push(...ConversationAggregationBuilder.buildSearchStages(userId, search));
    }

    pipeline.push(
      ConversationAggregationBuilder.buildLastMessageLookupStage(),
      ConversationAggregationBuilder.buildLastMessageFieldsStage(),
      ConversationAggregationBuilder.buildLastMessageSortStage(),
      ...ConversationAggregationBuilder.buildPaginationStages(skip, limit),
      ConversationAggregationBuilder.buildConversationProjectStage(),
    );

    return pipeline;
  }

  async listUserConversations(
    filter: UserConversationFilter,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ConversationMetaData, "participants.user">>> {
    const page = options.page != undefined ? options.page : 1;
    const limit = options.limit != undefined ? options.limit : 10;

    const skip = (page - 1) * limit;
    const totalDocs = await this.getTotalConversationsCount(
      filter.userId,
      filter.isGroup,
      filter.search,
    );

    const pipeline = this.buildGetConversationsAggregationPipeline(
      filter.userId,
      skip,
      limit,
      filter.search,
      filter.isGroup,
    );
    const conversations = (await this.model.aggregate(pipeline)) as unknown as Populate<
      ConversationMetaData,
      "participants.user"
    >[];

    return {
      docs: conversations,
      meta: this.getPaginationMeta(page, limit, totalDocs),
    };
  }

  async listConversationParticipants(
    conversationNewId: string,
    options: PaginationOptions & { role?: TConversationRoleEnums },
  ): Promise<ResponseWithPagination<Populate<ConversationMetaData, "participants.user">>> {
    const { page, limit, role } = options;
    const skip = (page - 1) * limit;

    const pipeline: PipelineStage[] = [
      ConversationAggregationBuilder.buildConversationByIdMatchStage(conversationNewId),
      ConversationAggregationBuilder.buildParticipantProjectStage(role),
      { $unwind: "$participants" },
      ...ConversationAggregationBuilder.buildParticipantRoleFilterStages(role),
      ...ConversationAggregationBuilder.buildPaginationStages(skip, limit),
      ...ConversationAggregationBuilder.buildParticipantUserLookupStages(),
      ConversationAggregationBuilder.buildUserTypeMergeStage(),
      ConversationAggregationBuilder.buildParticipantGroupStage(),
    ];

    const [result] = await this.model.aggregate(pipeline);

    const paginationMeta = this.getPaginationMeta(page, limit, result?.participantsCount || 0);

    return {
      docs: result ? [result] : [],
      meta: paginationMeta,
    };
  }

  private getPaginationMeta(page: number, limit: number, totalDocs: number): PaginationMeta {
    const totalPages = Math.ceil(totalDocs / limit);
    return {
      page,
      limit,
      totalDocs,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      hasMore: page < totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
  }

  async updateConversationParticipants(
    conversationId: ID,
    addedParticipants: ConversationParticipant[],
    deletedParticipantIds: ID[],
  ): Promise<void> {
    const updateQuery: UpdateQuery<Conversation> = {};

    if (addedParticipants.length > 0) {
      updateQuery.$addToSet = {
        participants: {
          $each: addedParticipants.map(participant => ({
            user: participant.user,
            userType: participant.userType,
            joinedAt: participant.joinedAt,
            role: participant.role,
          })),
        },
      };
    }

    if (deletedParticipantIds.length > 0) {
      updateQuery.$pull = {
        participants: {
          user: {
            $in: deletedParticipantIds,
          },
        },
      };
    }

    if (Object.keys(updateQuery).length > 0) {
      await this.model.updateOne({ _id: conversationId }, updateQuery);
    }
  }

  async createGroupConversation(participants: ConversationParticipant[]): Promise<Conversation> {
    const newConversation = await this.addOne({
      isGroup: true,
      participants,
      name: null,
      seenStatus: {},
    });
    return newConversation;
  }

  async updateSeenStatus(
    conversationId: ID,
    userId: ID,
    lastSeenMessageId: ID,
    userType: TEndUserEnum,
    tenantId: string,
  ): Promise<void> {
    const update = ConversationAggregationBuilder.buildSeenStatusUpdateOperation(
      userId,
      lastSeenMessageId,
      userType,
      tenantId,
    );
    await this.model.updateOne({ _id: conversationId }, update, this.session);
  }

  async getUnseenConversationNumberForUser(userId: ID): Promise<number> {
    const pipeline: PipelineStage[] = [
      // Match conversations where the user is a participant
      {
        $match: {
          "participants.user": new Types.ObjectId(userId),
        },
      },
      // Lookup the latest message for each conversation
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "conversation",
          as: "messages",
          pipeline: [
            {
              $sort: { sentAt: -1 },
            },
            {
              $limit: 1,
            },
          ],
        },
      },
      // Only consider conversations that have at least one message
      {
        $match: {
          "messages.0": { $exists: true },
        },
      },
      {
        $addFields: {
          latestMessage: { $arrayElemAt: ["$messages", 0] },
          userSeenStatus: {
            $getField: {
              field: userId,
              input: "$seenStatus",
            },
          },
        },
      },
      // Filter conversations where user hasn't seen the latest message
      {
        $match: {
          $or: [
            // User has no seen status recorded
            { userSeenStatus: { $exists: false } },
            // User's last seen message is different from the latest message
            { $expr: { $ne: ["$userSeenStatus.message", "$latestMessage._id"] } },
          ],
        },
      },
      // Count the unseen conversations
      {
        $count: "unseenCount",
      },
    ];

    const result = await this.model.aggregate<{ unseenCount: number }>(pipeline);
    return result.length > 0 ? result[0].unseenCount : 0;
  }
}
