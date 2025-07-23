import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Level, LevelMetaData } from "../../../feature/levels/domains/level.entity";
import { LevelRepo } from "../../../feature/levels/repos/Level.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ID } from "../../../types/BaseEntity";
import { SchoolYear } from "../../../feature/schoolYears/domain/schoolYear.entity";

@injectable()
export class MongoLevelRepo extends MongoBaseRepo<LevelMetaData> implements LevelRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "level", session);
  }

  async updateSchoolYear(schoolYearId: ID, data: SchoolYear): Promise<void> {
    await this.model
      .updateMany({ "currentSchoolYear._id": schoolYearId }, { currentSchoolYear: data })
      .session(this.session);
  }

  async listLevels(
    filter: { search?: string; sort?: Partial<Record<keyof LevelMetaData["entity"], 1 | -1>> },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Level>> {
    const filterQuery: FilterQuery<Level> = {};

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    const data = await this.findManyWithPagination(filterQuery, { ...options, sort: filter.sort });

    return data;
  }

  async getLevelsSortedByRank(): Promise<LevelMetaData["entity"][]> {
    return this.model.find({}, undefined, {
      sort: { rank: "1" },
    });
  }
}
