import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Diploma, DiplomaMetaData } from "../../../feature/diploma/diploma.entity";
import { DiplomaRepo } from "../../../feature/diploma/Diploma.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoDiplomaRepo extends MongoBaseRepo<DiplomaMetaData> implements DiplomaRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "diploma", session);
  }

  async findOneByAverageBounds(
    minAverage: number,
    maxAverage: number,
  ): Promise<DiplomaMetaData["entity"] | null> {
    const diploma = await this.model.findOne({
      $or: [{ minAverage: { $lte: maxAverage }, maxAverage: { $gte: minAverage } }],
    });
    return diploma;
  }

  async findOneByAverage(average: number): Promise<DiplomaMetaData["entity"] | null> {
    const diploma = await this.model.findOne({
      minAverage: { $lte: average },
      maxAverage: { $gte: average },
    });

    return diploma;
  }

  async findManyByNames(names: string[]): Promise<DiplomaMetaData["entity"][]> {
    const diploma = await this.model.find({ name: { $in: names } });
    return diploma;
  }

  async listDiplomas(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Diploma>> {
    const filterQuery: FilterQuery<Diploma> = {};

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }
}
