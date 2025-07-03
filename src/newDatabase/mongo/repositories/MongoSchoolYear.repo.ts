import { Populate } from "./../../../core/populateTypes";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  SchoolYear,
  SchoolYearMetaData,
} from "../../../feature/schoolYears/domain/schoolYear.entity";
import { SchoolYearRepo } from "../../../feature/schoolYears/domain/SchoolYear.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ID } from "../../../types/BaseEntity";
import { Term } from "../../../feature/terms/domains/term.entity";

export class MongoSchoolYearRepo
  extends MongoBaseRepo<SchoolYearMetaData>
  implements SchoolYearRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "schoolYear", session);
  }

  async findByLevelAndRange(
    levelId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<SchoolYear | null> {
    const { startDate, endDate } = range;
    return this.model.findOne({
      level: levelId,
      $or: [
        { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
        { startDate: { $gte: startDate }, endDate: { $lte: endDate } },
      ],
    });
  }
  async findOneByTerm(termId: ID): Promise<SchoolYear | null> {
    return this.model.findOne({ "terms._id": termId });
  }

  async updateTerm(termId: ID, term: Partial<Term>): Promise<void> {
    const updateFields: Record<string, unknown> = {};

    // Build dynamic update object for specific fields
    Object.keys(term).forEach(key => {
      updateFields[`terms.$.${key}`] = term[key as keyof Term];
    });

    await this.model
      .updateMany({ "terms._id": termId }, { $set: updateFields })
      .session(this.session);
  }

  async list(
    search: string | undefined,
    options: ListOptions,
  ): Promise<ResponseWithPagination<SchoolYear>> {
    const query: FilterQuery<SchoolYear> = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    return this.findManyWithPagination(query, options);
  }
  async findManyByLevel(levelId: string): Promise<Populate<SchoolYearMetaData, "level">[]> {
    return this.model.find(
      { level: levelId },
      {},
      {
        populate: ["level"],
      },
    );
  }
}
