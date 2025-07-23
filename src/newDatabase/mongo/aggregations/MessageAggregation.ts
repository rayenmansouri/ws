import { PipelineStage } from "mongoose";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import {
  MessageTypeCondition,
  ReactionAddOperation,
  ReactionRemoveOperation,
  ReactionUpdateOperation,
  SenderLookupOperation,
} from "../types/MessageAggregation.types";
import { TMessageReactionTypeEnum } from "../../../feature/messages/domain/message.entity";

export class MessageAggregationBuilder {
  static buildReactionAddOperation(
    userId: ID,
    reactionType: TMessageReactionTypeEnum,
    userType: TEndUserEnum,
    tenantId: string,
  ): ReactionAddOperation {
    return {
      $push: {
        reactions: {
          $each: [
            {
              user: userId,
              reactionType,
              userType,
              reactedAt: getCurrentTimeOfSchool(tenantId),
            },
          ],
          $position: 0,
        },
      },
    };
  }

  static buildReactionRemoveOperation(userId: ID): ReactionRemoveOperation {
    return {
      $pull: {
        reactions: { user: userId },
      },
    };
  }

  static buildReactionUpdateOperation(
    reactionType: TMessageReactionTypeEnum,
  ): ReactionUpdateOperation {
    return {
      $set: { "reactions.$.reactionType": reactionType },
    };
  }

  static buildSenderLookupStage(userType: string, collection: string): SenderLookupOperation {
    return {
      [userType]: [
        {
          $match: { "lastMessage.senderType": userType },
        },
        {
          $lookup: {
            from: collection,
            let: { senderId: "$lastMessage.sender" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$senderId"] }, isDeleted: { $ne: true } } },
              { $project: { fullName: 1, avatar: 1 } },
            ],
            as: "senderInfo",
          },
        },
        {
          $set: {
            senderInfo: {
              $cond: {
                if: { $eq: [{ $size: "$senderInfo" }, 0] },
                then: null,
                else: { $first: "$senderInfo" },
              },
            },
          },
        },
      ],
    };
  }

  static buildConversationMatchStage(conversationIds: string[]): PipelineStage.Match {
    return {
      $match: {
        conversation: { $in: stringsToObjectIds(conversationIds) },
      },
    };
  }

  static buildLastMessageGroupStage(): (PipelineStage.Sort | PipelineStage.Group)[] {
    return [
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$conversation",
          lastMessage: { $first: "$$ROOT" },
        },
      },
    ];
  }

  static buildConversationJoinStage(): PipelineStage.Lookup {
    return {
      $lookup: {
        from: "conversations",
        localField: "_id",
        foreignField: "_id",
        as: "conversationData",
      },
    };
  }

  static buildSeenStatusAddStage(): PipelineStage.AddFields {
    return {
      $addFields: {
        seenStatus: { $arrayElemAt: ["$conversationData.seenStatus", 0] },
      },
    };
  }

  static buildMultiUserLookupStage(): (
    | PipelineStage.Facet
    | PipelineStage.Project
    | PipelineStage.Unwind
  )[] {
    return [
      {
        $facet: {
          ...this.buildSenderLookupStage("admin", "admins"),
          ...this.buildSenderLookupStage("teacher", "teachers"),
          ...this.buildSenderLookupStage("parent", "parents"),
          ...this.buildSenderLookupStage("student", "students"),
        },
      },
      {
        $project: {
          allMessages: {
            $concatArrays: ["$admin", "$teacher", "$parent", "$student"],
          },
        },
      },
      {
        $unwind: "$allMessages",
      },
    ];
  }

  static buildMessageProjectStage(): PipelineStage.Project {
    return {
      $project: {
        _id: 1,
        conversation: "$allMessages._id",
        seenStatus: "$allMessages.seenStatus",
        lastMessage: {
          _id: "$allMessages.lastMessage._id",
          newId: "$allMessages.lastMessage.newId",
          senderId: {
            $cond: {
              if: { $eq: ["$allMessages.senderInfo", null] },
              then: "$allMessages.lastMessage.sender",
              else: "$allMessages.senderInfo._id",
            },
          },
          senderType: "$allMessages.lastMessage.senderType",
          senderName: "$allMessages.senderInfo.fullName",
          content: "$allMessages.lastMessage.content",
          sentAt: "$allMessages.lastMessage.sentAt",
          files: "$allMessages.lastMessage.files",
          media: "$allMessages.lastMessage.media",
          type: this.buildMessageTypeCondition(),
          isDeleted: "$allMessages.lastMessage.isDeleted",
        },
      },
    };
  }

  static buildMessageTypeCondition(): MessageTypeCondition {
    return {
      $cond: {
        if: {
          $or: [
            { $gt: [{ $size: "$allMessages.lastMessage.files" }, 0] },
            { $gt: [{ $size: "$allMessages.lastMessage.media" }, 0] },
          ],
        },
        then: "attachment",
        else: "content",
      },
    };
  }

  static buildUserLookupStages(): PipelineStage[] {
    return [
      {
        $lookup: {
          from: "admins",
          let: { userId: "$reactions.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                isArchived: { $ne: true },
              },
            },
          ],
          as: "adminUser",
        },
      },
      {
        $lookup: {
          from: "teachers",
          let: { userId: "$reactions.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                isArchived: { $ne: true },
              },
            },
          ],
          as: "teacherUser",
        },
      },
      {
        $lookup: {
          from: "students",
          let: { userId: "$reactions.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                isArchived: { $ne: true },
              },
            },
          ],
          as: "studentUser",
        },
      },
      {
        $lookup: {
          from: "parents",
          let: { userId: "$reactions.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
                isArchived: { $ne: true },
              },
            },
          ],
          as: "parentUser",
        },
      },
    ];
  }

  static buildUserTypeMergeStage(): PipelineStage {
    return {
      $addFields: {
        "reactions.user": {
          $switch: {
            branches: [
              {
                case: { $gt: [{ $size: "$adminUser" }, 0] },
                then: {
                  $mergeObjects: [{ $arrayElemAt: ["$adminUser", 0] }, { userType: "admin" }],
                },
              },
              {
                case: { $gt: [{ $size: "$teacherUser" }, 0] },
                then: {
                  $mergeObjects: [{ $arrayElemAt: ["$teacherUser", 0] }, { userType: "teacher" }],
                },
              },
              {
                case: { $gt: [{ $size: "$studentUser" }, 0] },
                then: {
                  $mergeObjects: [{ $arrayElemAt: ["$studentUser", 0] }, { userType: "student" }],
                },
              },
              {
                case: { $gt: [{ $size: "$parentUser" }, 0] },
                then: {
                  $mergeObjects: [{ $arrayElemAt: ["$parentUser", 0] }, { userType: "parent" }],
                },
              },
            ],
            default: null,
          },
        },
      },
    };
  }
}
