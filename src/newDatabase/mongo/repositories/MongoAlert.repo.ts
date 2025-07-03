import { ClientSession, Connection, FilterQuery, PipelineStage } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { AlertMetaData } from "../../../feature/alertManagement/domain/alert.entity";
import { AlertRepo } from "../../../feature/alertManagement/domain/Alert.repo";
import { StudentProfileRepo } from "../../../feature/students/domain/StudentProfile.repo";
import { BaseUser } from "../../../feature/users/domain/baseUser.entity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { Populate } from "./../../../core/populateTypes";
import { Alert } from "./../../../feature/alertManagement/domain/alert.entity";
import { stringsToObjectIds } from "./../../../helpers/stringToObjectId";
import { ID } from "./../../../types/BaseEntity";
import { ListOptions } from "./../../../types/types";
import { PaginationMeta, ResponseWithPagination } from "./../types";
import { MongoBaseRepo } from "./MongoBase.repo";

interface ListUsersForAlertFilters {
  fullName?: string;
  userTypes: TEndUserEnum[];
  groupIds?: ID[];
  classes?: ID[];
  classTypes?: ID[];
  levels?: ID[];
  page?: number;
  limit?: number;
}

export class MongoAlertRepo extends MongoBaseRepo<AlertMetaData> implements AlertRepo {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("Session") session: ClientSession | null,
    @inject("StudentProfileRepo") private readonly studentProfileRepo: StudentProfileRepo,
  ) {
    super(connection, "alert", session);
  }

  async listAlerts(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<AlertMetaData, "createdBy">>> {
    const filterQuery: FilterQuery<Alert> = {};

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({ status: { $regex: filter.search, $options: "i" } });

      const parsedNumber = Number(filter.search);

      if (!isNaN(parsedNumber)) {
        filterQuery.$or.push({
          $expr: { $eq: [{ $size: "$users" }, parsedNumber] },
        });
      }
    }

    const response = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["createdBy"],
    });

    return response;
  }

  async listUsersForAlert(filters: ListUsersForAlertFilters): Promise<
    ResponseWithPagination<
      Pick<BaseUser, "_id" | "newId" | "fullName" | "avatar" | "email" | "phoneNumber"> & {
        userType: TEndUserEnum;
      }
    >
  > {
    const finalPipeline: PipelineStage[] = [];
    const unionPipelines: PipelineStage[] = [];

    const baseMatch: {
      fullName?: { $regex: string; $options: string };
      isArchived: false;
      isActive: true;
    } = {
      isArchived: false,
      isActive: true,
    };

    if (filters.fullName) {
      baseMatch.fullName = { $regex: filters.fullName, $options: "i" };
    }

    const createPriorityField = (fullName: string = ""): Record<string, number | any> => ({
      $cond: [
        {
          $regexMatch: {
            input: "$fullName",
            regex: `^${fullName}`,
            options: "i",
          },
        },
        1,
        2,
      ],
    });

    let filteredUserTypes = filters.userTypes;

    if (filters.userTypes.length === 0)
      filteredUserTypes = ["parent", "student", "teacher", "admin"];

    if (filteredUserTypes.some(userType => userType === "admin"))
      filteredUserTypes = filteredUserTypes.filter(userType => userType !== "admin");

    const levelIds =
      filters.levels && filters.levels?.length ? stringsToObjectIds(filters.levels) : [];

    const classIds =
      filters.classes && filters.classes?.length ? stringsToObjectIds(filters.classes) : [];

    const classTypeIds =
      filters.classTypes && filters.classTypes?.length
        ? stringsToObjectIds(filters.classTypes)
        : [];

    const groupIds =
      filters.groupIds && filters.groupIds?.length ? stringsToObjectIds(filters.groupIds) : [];

    if (filteredUserTypes.includes("admin") || filteredUserTypes.length === 0) {
      const adminPipeline = [
        { $match: { ...baseMatch, isImpersonation: false } },
        {
          $addFields: {
            priority: createPriorityField(filters.fullName),
            userType: { $literal: "admin" },
          },
        },
      ];

      finalPipeline.push(...adminPipeline);
    } else {
      finalPipeline.push({ $match: { _id: { $exists: false } } });
    }

    for (const userType of filteredUserTypes) {
      if (userType === "admin") continue;

      let collectionName: string;
      const pipeline: any[] = [];

      switch (userType) {
        case "student": {
          collectionName = "students";
          pipeline.push({ $match: baseMatch });

          if (levelIds.length > 0) {
            pipeline.push({ $match: { level: { $in: levelIds } } });
          }

          if (classTypeIds.length > 0) {
            pipeline.push({ $match: { classType: { $in: classTypeIds } } });
          }

          if (classIds.length > 0 || groupIds.length > 0) {
            const lookupMatch: Record<string, any> = {
              $expr: { $eq: ["$student", "$$studentId"] },
            };

            if (classIds.length > 0) {
              lookupMatch.class = { $in: classIds };
            }

            if (groupIds.length > 0) {
              lookupMatch.group = { $in: groupIds };
            }

            pipeline.push(
              {
                $lookup: {
                  from: "studentprofiles",
                  let: { studentId: "$_id" },
                  pipeline: [{ $match: lookupMatch }],
                  as: "profiles",
                },
              },
              { $match: { "profiles.0": { $exists: true } } },
            );
          }

          pipeline.push({
            $addFields: {
              priority: createPriorityField(filters.fullName),
              userType: { $literal: userType },
            },
          });
          break;
        }

        case "teacher": {
          collectionName = "teachers";
          pipeline.push({ $match: baseMatch });

          if (levelIds.length > 0) {
            pipeline.push({
              $match: {
                $or: levelIds.map(levelId => ({ levels: levelId })),
              },
            });
          }

          if (classIds.length > 0 || classTypeIds.length > 0 || groupIds.length > 0) {
            const lookupMatch: Record<string, any> = {
              $expr: { $eq: ["$teacher", "$$teacherId"] },
            };

            if (classIds.length > 0) {
              lookupMatch.$or = classIds.map(classId => ({ classes: classId }));
            }

            if (groupIds.length > 0) {
              const groupConditions = groupIds.map(groupId => ({
                groups: groupId,
              }));

              if (lookupMatch.$or) {
                lookupMatch.$and = [{ $or: lookupMatch.$or }, { $or: groupConditions }];
                delete lookupMatch.$or;
              } else {
                lookupMatch.$or = groupConditions;
              }
            }

            pipeline.push({
              $lookup: {
                from: "teacherprofiles",
                let: { teacherId: "$_id" },
                pipeline: [{ $match: lookupMatch }],
                as: "profiles",
              },
            });

            if (classIds.length > 0 || groupIds.length > 0) {
              pipeline.push({ $match: { "profiles.0": { $exists: true } } });
            }

            if (classTypeIds.length > 0) {
              pipeline.push(
                {
                  $lookup: {
                    from: "classes",
                    let: { classesList: "$profiles.classes" },
                    pipeline: [
                      {
                        $match: {
                          $expr: { $in: ["$_id", { $arrayElemAt: ["$$classesList", 0] }] },
                          classType: { $in: classTypeIds },
                        },
                      },
                    ],
                    as: "matchingClasses",
                  },
                },
                { $match: { "matchingClasses.0": { $exists: true } } },
              );
            }
          }

          pipeline.push({
            $addFields: {
              priority: createPriorityField(filters.fullName),
              userType: { $literal: userType },
            },
          });
          break;
        }

        case "parent": {
          collectionName = "parents";
          pipeline.push({ $match: baseMatch });

          if (
            classIds.length > 0 ||
            classTypeIds.length > 0 ||
            levelIds.length > 0 ||
            groupIds.length > 0
          ) {
            const studentMatch: Record<string, any> = {
              $expr: { $in: ["$$parentId", "$parents"] },
              isArchived: false,
            };

            if (levelIds.length > 0) {
              studentMatch.level = { $in: levelIds };
            }

            if (classTypeIds.length > 0) {
              studentMatch.classType = { $in: classTypeIds };
            }

            pipeline.push({
              $lookup: {
                from: "students",
                let: { parentId: "$_id" },
                pipeline: [{ $match: studentMatch }],
                as: "relatedStudents",
              },
            });

            if (classIds.length > 0 || groupIds.length > 0) {
              const profileMatch: Record<string, any> = {
                $expr: { $in: ["$student", "$$studentIds"] },
              };

              if (classIds.length > 0) {
                profileMatch.class = { $in: classIds };
              }

              if (groupIds.length > 0) {
                profileMatch.group = { $in: groupIds };
              }

              pipeline.push(
                {
                  $lookup: {
                    from: "studentprofiles",
                    let: { studentIds: "$relatedStudents._id" },
                    pipeline: [{ $match: profileMatch }],
                    as: "studentprofiles",
                  },
                },
                { $match: { "studentprofiles.0": { $exists: true } } },
              );
            } else {
              pipeline.push({ $match: { "relatedStudents.0": { $exists: true } } });
            }
          }

          pipeline.push({
            $addFields: {
              priority: createPriorityField(filters.fullName),
              userType: { $literal: userType },
            },
          });
          break;
        }

        default:
          continue;
      }

      if (pipeline.length > 0) {
        unionPipelines.push({
          $unionWith: {
            coll: collectionName,
            pipeline: pipeline,
          },
        });
      }
    }

    finalPipeline.push(...unionPipelines);

    finalPipeline.push({ $sort: { priority: 1, fullName: 1 } });

    const countPipeline = [...finalPipeline, { $count: "totalDocs" }];
    const [{ totalDocs = 0 } = {}] = await this.connection.model("admin").aggregate(countPipeline);

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;
    const totalPages = Math.ceil(totalDocs / limit);

    finalPipeline.push(
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          newId: 1,
          fullName: 1,
          avatar: 1,
          userType: 1,
          phoneNumber: 1,
        },
      },
    );

    const docs = (await this.connection
      .model("admin")
      .aggregate(finalPipeline)) as unknown as (Pick<
      BaseUser,
      "_id" | "newId" | "fullName" | "avatar" | "email" | "phoneNumber"
    > & { userType: TEndUserEnum })[];

    const meta: PaginationMeta = {
      limit,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      hasMore: page < totalPages,
      totalDocs,
      totalPages,
      page,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    const mappedDocs = docs.map(doc => {
      return {
        ...doc,
        userType: doc.userType || "admin",
      };
    });

    return { docs: mappedDocs, meta };
  }
}
