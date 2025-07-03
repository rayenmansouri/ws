import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  SubSubjectType,
  SubSubjectTypeMetaData,
} from "../../../feature/subSubjectTypes/domains/subSubjectType.entity";
import { SubSubjectTypesRepo } from "../../../feature/subSubjectTypes/repos/SubSubjectTypes.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

@injectable()
export class MongoSubSubjectTypeRepo
  extends MongoBaseRepo<SubSubjectTypeMetaData>
  implements SubSubjectTypesRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "subSubjectType", session);
  }

  async list(
    search: string | undefined,
    listOption: ListOptions,
  ): Promise<ResponseWithPagination<SubSubjectType>> {
    const filter: FilterQuery<SubSubjectType> = {};

    if (search) filter.name = { $regex: search, $options: "i" };

    return this.findManyWithPagination(filter, listOption);
  }
}
