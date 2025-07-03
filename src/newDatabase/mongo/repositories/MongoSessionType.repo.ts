import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SessionTypeRepo } from "../../../feature/sessionTypes/repos/SessionType.repo";
import {
  SessionType,
  SessionTypeMetaData,
} from "../../../feature/sessionTypes/domains/sessionType.entity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

@injectable()
export class MongoSessionTypeRepo
  extends MongoBaseRepo<SessionTypeMetaData>
  implements SessionTypeRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "sessionType", session);
  }

  async list(
    query: Partial<{ name: string } & ListOptions>,
  ): Promise<ResponseWithPagination<SessionType>> {
    const filter: FilterQuery<SessionType> = {};

    if (query.name) {
      filter.name = { $regex: new RegExp(query.name, "i") };
    }

    return this.findManyWithPagination(filter, { page: query.page, limit: query.limit });
  }
}
