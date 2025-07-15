import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SubjectTypeMetaData } from "../../../feature/subjectTypes/domains/subjectType.entity";
import { SubjectTypeRepo } from "../../../feature/subjectTypes/domains/SubjectType.repo";
import { SubjectType } from "../../../feature/subjectTypes/domains/subjectType.entity";
import { ListOptions } from "./../../../types/types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";

@injectable()
export class MongoSubjectTypeRepo
  extends MongoBaseRepo<SubjectTypeMetaData>
  implements SubjectTypeRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "subjectType", session);
  }

  async listSubjectTypes(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<SubjectType>> {
    const filterQuery: FilterQuery<SubjectType> = {};
    if (filter.search) {
      filterQuery.$or = [{ name: { $regex: filter.search, $options: "i" } }];
    }
    const response = await this.findManyWithPagination(filterQuery, options);
    return response;
  }
}
