import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Tutorial, TutorialMetaData } from "../../../feature/tutorial/domain/tutorial.entity";
import { TutorialRepo } from "../../../feature/tutorial/domain/Tutorial.repo";
import { mongoTutorialModel } from "../schemas/tutorial.schema";
import { MongoMasterBaseRepo } from "./MongoMasterBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoTutorialRepo
  extends MongoMasterBaseRepo<TutorialMetaData>
  implements TutorialRepo
{
  constructor(
    @inject("MasterConnection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, mongoTutorialModel, session);
  }

  async list(
    query: { search?: string } & ListOptions,
  ): Promise<ResponseWithPagination<TutorialMetaData["entity"]>> {
    const { search, page, limit } = query;
    const filter: FilterQuery<Tutorial> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { interfaceKeys: { $regex: search, $options: "i" } },
      ];
    }
    return this.findManyWithPagination(filter, {
      page,
      limit,
    });
  }
}
