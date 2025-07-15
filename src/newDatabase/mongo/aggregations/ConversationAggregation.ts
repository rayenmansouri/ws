import { PipelineStage } from "mongoose";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { TConversationRoleEnums } from "../../../feature/messages/domain/conversation.entity";
import { stringToObjectId } from "../../../helpers/functions";
import { ID } from "../../../types/BaseEntity";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";

export class ConversationAggregationBuilder {
  static buildParticipantMatchStage(userId: string, isGroup?: boolean): PipelineStage.Match {
    if (isGroup === undefined)
      return {
        $match: {
          "participants.user": stringToObjectId(userId),
        },
      };
    else
      return {
        $match: {
          "participants.user": stringToObjectId(userId),
          isGroup,
        },
      };
  }

  static buildLastMessageLookupStage(): PipelineStage.Lookup {
    return {
      $lookup: {
        from: "messages",
        let: { conversationId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$conversation", "$$conversationId"] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
        ],
        as: "lastMessage",
      },
    };
  }

  static buildLastMessageFieldsStage(): PipelineStage.AddFields {
    return {
      $addFields: {
        lastMessage: { $arrayElemAt: ["$lastMessage", 0] },
        lastMessageDate: {
          $ifNull: [{ $arrayElemAt: ["$lastMessage.sentAt", 0] }, new Date(0)],
        },
      },
    };
  }

  static buildLastMessageSortStage(): PipelineStage.Sort {
    return {
      $sort: {
        lastMessageDate: -1,
      },
    };
  }

  static buildParticipantUserLookupStages(): PipelineStage[] {
    return [
      {
        $lookup: {
          from: "admins",
          let: { userId: "$participants.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
          ],
          as: "adminUser",
        },
      },
      {
        $lookup: {
          from: "teachers",
          let: { userId: "$participants.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
          ],
          as: "teacherUser",
        },
      },
      {
        $lookup: {
          from: "students",
          let: { userId: "$participants.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
          ],
          as: "studentUser",
        },
      },
      {
        $lookup: {
          from: "parents",
          let: { userId: "$participants.user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
          ],
          as: "parentUser",
        },
      },
    ];
  }

  static buildUserTypeMergeStage(): PipelineStage.AddFields {
    return {
      $addFields: {
        "participants.user": {
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

  static buildConversationGroupStage(): PipelineStage.Group {
    return {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        newId: { $first: "$newId" },
        isGroup: { $first: "$isGroup" },
        lastMessage: { $first: "$lastMessage" },
        lastMessageDate: { $first: "$lastMessageDate" },
        participants: { $push: "$participants" },
        seenStatus: { $first: "$seenStatus" },
        searchScore: { $first: "$searchScore" },
      },
    };
  }

  static buildPaginationStages(
    skip: number,
    limit: number | null,
  ): (PipelineStage.Sort | PipelineStage.Skip | PipelineStage.Limit)[] {
    if (!limit) return [{ $sort: { lastMessageDate: -1 } }, { $skip: skip }];
    return [{ $sort: { lastMessageDate: -1 } }, { $skip: skip }, { $limit: limit }];
  }

  static buildConversationProjectStage(): PipelineStage.Project {
    return {
      $project: {
        _id: 1,
        name: 1,
        newId: 1,
        isGroup: 1,
        participants: 1,
        lastMessage: 1,
        seenStatus: 1,
      },
    };
  }

  static buildSearchStages(
    userId: ID,
    search?: string,
  ): (PipelineStage.Match | PipelineStage.AddFields)[] {
    if (!search) return [];

    const escapedSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const pipeline: (PipelineStage.Match | PipelineStage.AddFields)[] = [
      {
        $match: {
          $or: [
            { name: { $regex: escapedSearch, $options: "i" } },
            {
              "participants.user.fullName": {
                $regex: escapedSearch,
                $options: "i",
              },
            },
          ],
        },
      },
      {
        $addFields: {
          nameScore: {
            $sum: [
              {
                $cond: {
                  if: { $regexMatch: { input: "$name", regex: `^${escapedSearch}`, options: "i" } },
                  then: 100,
                  else: 0,
                },
              },
              {
                $cond: {
                  if: {
                    $regexMatch: { input: "$name", regex: `\\b${escapedSearch}`, options: "i" },
                  },
                  then: 50,
                  else: 0,
                },
              },
              {
                $cond: {
                  if: { $regexMatch: { input: "$name", regex: escapedSearch, options: "i" } },
                  then: 25,
                  else: 0,
                },
              },
            ],
          },
          participantMatchScore: {
            $max: {
              $map: {
                input: "$participants",
                as: "p",
                in: {
                  $cond: {
                    if: {
                      $and: [
                        { $ne: ["$$p.user._id", stringToObjectId(userId)] },
                        {
                          $or: [
                            {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: `^${escapedSearch}`,
                                options: "i",
                              },
                            },
                            {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: `\\b${escapedSearch}`,
                                options: "i",
                              },
                            },
                            {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: escapedSearch,
                                options: "i",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    then: {
                      $sum: [
                        {
                          $cond: {
                            if: {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: `^${escapedSearch}`,
                                options: "i",
                              },
                            },
                            then: 100,
                            else: 0,
                          },
                        },
                        {
                          $cond: {
                            if: {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: `\\b${escapedSearch}`,
                                options: "i",
                              },
                            },
                            then: 50,
                            else: 0,
                          },
                        },
                        {
                          $cond: {
                            if: {
                              $regexMatch: {
                                input: "$$p.user.fullName",
                                regex: escapedSearch,
                                options: "i",
                              },
                            },
                            then: 25,
                            else: 0,
                          },
                        },
                      ],
                    },
                    else: 0,
                  },
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          searchScore: { $add: ["$nameScore", "$participantMatchScore"] },
        },
      },
      {
        $match: {
          searchScore: { $gt: 0 },
        },
      },
    ];

    return pipeline;
  }

  static buildConversationByIdMatchStage(conversationNewId: string): PipelineStage.Match {
    return {
      $match: {
        newId: conversationNewId,
      },
    };
  }

  static buildParticipantProjectStage(role?: TConversationRoleEnums): PipelineStage.Project {
    return {
      $project: {
        name: 1,
        isGroup: 1,
        participants: 1,
        participantsCount: {
          $size: {
            $filter: {
              input: "$participants",
              as: "participant",
              cond: role
                ? { $eq: ["$$participant.role", role] }
                : { $ne: ["$$participant.role", null] },
            },
          },
        },
      },
    };
  }

  static buildParticipantRoleFilterStages(role?: TConversationRoleEnums): PipelineStage.Match[] {
    if (!role) return [];
    return [
      {
        $match: {
          "participants.role": role,
        },
      },
    ];
  }

  static buildParticipantGroupStage(): PipelineStage.Group {
    return {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        isGroup: { $first: "$isGroup" },
        participants: {
          $push: {
            user: "$participants.user",
            userType: "$participants.userType",
            role: "$participants.role",
            joinedAt: "$participants.joinedAt",
          },
        },
        participantsCount: { $first: "$participantsCount" },
      },
    };
  }

  static buildSeenStatusUpdateOperation(
    userId: ID,
    lastSeenMessageId: ID,
    userType: TEndUserEnum,
    tenantId: string,
  ): { $set: Record<string, { message: ID; seenAt: Date; userType: TEndUserEnum }> } {
    return {
      $set: {
        [`seenStatus.${userId}`]: {
          message: lastSeenMessageId,
          seenAt: getCurrentTimeOfSchool(tenantId),
          userType: userType,
        },
      },
    };
  }
}
