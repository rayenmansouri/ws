import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ExamType, ExamTypeMetaData } from "../../../feature/examTypes/domains/examType.entity";
import { ExamTypeRepo } from "../../../feature/examTypes/repos/examType.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";
import { ListOptions } from "../../../types/types";

@injectable()
export class MongoExamTypeRepo extends MongoBaseRepo<ExamTypeMetaData> implements ExamTypeRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "examType", session);
  }

  async list(query: { name?: string } & ListOptions): Promise<ResponseWithPagination<ExamType>> {
    const filter: FilterQuery<ExamType> = {};

    if (query.name) filter.name = { $regex: query.name, $options: "i" };

    const examTypes = await this.findManyWithPagination(filter, {
      page: query.page,
      limit: query.limit,
      sort: { rank: 1 },
    });

    return examTypes;
  }
}
