import { ID } from "./../../../types/BaseEntity";
import { stringsToObjectIds } from "./../../../helpers/stringToObjectId";

export class UsersAggregationBuilder {
  static buildUserSearchPipeline(collection: string, search: string, excludeUserIds: ID[] = []) {
    return {
      $unionWith: {
        coll: collection,
        pipeline: [
          {
            $match: {
              fullName: { $regex: search, $options: "i" },
              isArchived: false,
              _id: { $nin: stringsToObjectIds(excludeUserIds) },
            },
          },
          {
            $addFields: {
              priority: {
                $cond: [
                  { $regexMatch: { input: "$fullName", regex: `^${search}`, options: "i" } },
                  1,
                  2,
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              newId: 1,
              fullName: 1,
              avatar: 1,
              userType: { $literal: collection.slice(0, -1) },
              priority: 1,
            },
          },
        ],
      },
    };
  }
}
