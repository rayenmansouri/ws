import { Group, GroupMetaData } from "../../../feature/groupManagement/domains/group.entity";
import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../../../feature/groupManagement/repos/Group.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { Populate } from "../../../core/populateTypes";

@injectable()
export class MongoGroupRepo extends MongoBaseRepo<GroupMetaData> implements GroupRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "group", session);
  }

  async updateManyByGroupType(groupTypeId: ID, data: Partial<Group>): Promise<void> {
    await this.model.updateMany({ "groupType._id": groupTypeId }, data);
  }

  async findManyByIdsForGrades(ids: ID[]): Promise<Group[]> {
    return this.model.find({ _id: { $in: ids }, "groupType.coefficient": { $ne: null } }).lean();
  }

  async findManyByStudentsAndSchoolYear(students: ID[], schoolYearId: ID): Promise<Group[]> {
    return this.model.find({ students: { $in: students }, schoolYears: schoolYearId }).lean();
  }

  async find(filter: { search?: string }, options: { limit: number }): Promise<Group[]> {
    const query: FilterQuery<Group> = { $or: [] };

    if (filter.search) {
      query.$or?.push(
        { name: { $regex: filter.search, $options: "i" } },
        { newId: { $regex: filter.search, $options: "i" } },
      );
    }

    const queryResultPromise = this.model.find(query);

    if (options?.limit != undefined && options.limit > 0) queryResultPromise.limit(options.limit);

    return queryResultPromise.lean();
  }
  async findByTeacherAndSchoolYears(
    teacherId: ID,
    schoolYearIds: ID[],
    search?: string,
  ): Promise<Group[]> {
    const query: FilterQuery<Group> = {
      $or: [],
      teacher: teacherId,
      schoolYears: { $in: schoolYearIds },
    };

    if (search) {
      query.$or?.push(
        { name: { $regex: search, $options: "i" } },
        { newId: { $regex: search, $options: "i" } },
      );
    }

    return this.model.find(query).lean();
  }

  async findManyByLevels(levelIds: ID[]): Promise<Group[]> {
    return this.model.find({ levels: { $in: levelIds } }).lean();
  }

  async list(
    filter: { levelIds?: ID[]; search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Group>> {
    const filterQuery: FilterQuery<Group> = {};

    if (filter.levelIds) filterQuery.levels = { $in: filter.levelIds };

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }

  async findManyByGroupTypes<
    FieldsToPopulate extends keyof GroupMetaData["populatedFields"] = never,
  >(
    groupsTypeIds: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<GroupMetaData, FieldsToPopulate>[]> {
    const query = { "groupType._id": { $in: groupsTypeIds } };
    const queryResult = this.model.find(query);

    if (options?.populate) queryResult.populate(options.populate);

    return await queryResult.lean();
  }

  async findManyByGroupTypeAndSchoolYears<
    FieldsToPopulate extends keyof GroupMetaData["populatedFields"] = never,
  >(groupType: ID, schoolYears: ID[]): Promise<Populate<GroupMetaData, FieldsToPopulate>[]> {
    return this.model.find({
      groupType,
      schoolYears: { $in: schoolYears },
    });
  }
}
