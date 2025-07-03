import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { SubLevelMetaData } from "../../../feature/subLevels/domains/subLevel.entity";
import { SubLevelRepo } from "../../../feature/subLevels/domains/SubLevel.repo";
import { TranslationPaths } from "../../../translation/translationKeys";
import { ID } from "../../../types/BaseEntity";
import { ResponseWithPagination } from "../types";
import { SubLevel } from "./../../../feature/subLevels/domains/subLevel.entity";
import { ListOptions } from "./../../../types/types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { SchoolYear } from "../../../feature/schoolYears/domain/schoolYear.entity";
import { Term } from "../../../feature/terms/domains/term.entity";

@injectable()
export class MongoSubLevelRepo extends MongoBaseRepo<SubLevelMetaData> implements SubLevelRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "subLevel", session);
  }

  async updateSchoolYear(schoolYearId: ID, data: SchoolYear): Promise<void> {
    await this.model
      .updateMany(
        { "level.currentSchoolYear._id": schoolYearId },
        { "level.currentSchoolYear": data },
      )
      .session(this.session);
  }

  async updateTerm(termId: ID, term: Partial<Term>): Promise<void> {
    const updateFields: Record<string, unknown> = {};

    Object.keys(term).forEach(key => {
      updateFields[`level.currentSchoolYear.terms.$.${key}`] = term[key as keyof Term];
    });

    await this.model
      .updateMany({ "level.currentSchoolYear.terms._id": termId }, { $set: updateFields })
      .session(this.session);
  }

  async count(): Promise<number> {
    return this.model.countDocuments();
  }

  async findManyByLevel(levelId: ID): Promise<SubLevel[]> {
    return this.model.find({ "level._id": levelId });
  }

  async updateManyByLevel(levelId: ID, data: Partial<SubLevel>): Promise<void> {
    await this.model.updateMany({ "level._id": levelId }, data);
  }

  async findOneByRankOrThrow(rank: number, message: TranslationPaths): Promise<SubLevel> {
    const data = await this.model.findOne({ rank });

    if (!data) throw new NotFoundError(message);

    return data;
  }

  async listSubLevels(
    filter: {
      search?: string;
      levelNewIds?: string[];
      hasSections?: boolean;
    },
    options: ListOptions & { sort?: Partial<Record<keyof SubLevelMetaData["entity"], 1 | -1>> },
  ): Promise<ResponseWithPagination<SubLevel>> {
    const filterQuery: FilterQuery<SubLevel> = {};
    if (filter.search) filterQuery.$or = [{ name: { $regex: filter.search, $options: "i" } }];

    if (filter.levelNewIds) filterQuery["level.newId"] = { $in: filter.levelNewIds };

    if (filter.hasSections !== undefined) filterQuery.hasSections = filter.hasSections;

    const response = await this.findManyWithPagination(filterQuery, options);
    return response;
  }

  async findSubLevelsOfLevels(levelIds: ID[]): Promise<SubLevel[]> {
    const subLevels = await this.model.find({ "level._id": { $in: levelIds } });
    return subLevels;
  }

  async findSubLevelsByLevelIdsOrderedByRank(levelsIds: ID[]): Promise<SubLevel[]> {
    return this.model.find(
      {
        "level._id": { $in: levelsIds },
      },
      null,
      {
        sort: { rank: 1 },
      },
    );
  }
}
