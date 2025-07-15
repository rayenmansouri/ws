import { injectable } from "inversify";
import {
  GroupType,
  GroupTypeMetaData,
} from "../../../feature/groupManagement/domains/groupType.entity";
import { GroupTypeRepo } from "../../../feature/groupManagement/repos/GroupType.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { inject } from "../../../core/container/TypedContainer";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ID } from "../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";

@injectable()
export class MongoGroupTypeRepo extends MongoBaseRepo<GroupTypeMetaData> implements GroupTypeRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "groupType", session);
  }

  async findOneByExamType(examTypeId: ID): Promise<GroupType | null> {
    return this.model.findOne({ "exams.examType": examTypeId }).lean();
  }

  async list(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<GroupTypeMetaData, "exams.examType">>> {
    const filterQuery: FilterQuery<GroupType> = {};

    if (filter.search) {
      filterQuery.name = { $regex: filter.search, $options: "i" };
    }

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["exams.examType"],
    });

    return data;
  }
}
