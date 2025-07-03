import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Master, MasterMetaData } from "../../../feature/masters/domain/master.entity";
import { MasterRepo } from "../../../feature/masters/domain/Master.repo";
import { MongoMasterBaseRepo } from "./MongoMasterBase.repo";
import { mongoMasterModel } from "../schemas/master.schema";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { Populate } from "../../../core/populateTypes";

export class MongoMasterRepo extends MongoMasterBaseRepo<MasterMetaData> implements MasterRepo {
  constructor(
    @inject("MasterConnection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, mongoMasterModel, session);
  }

  async listMaster(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<MasterMetaData, "roles">>> {
    const filterQuery: FilterQuery<Master> = {};

    if (filter.search) filterQuery.fullName = { $regex: filter.search, $options: "i" };

    const response = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["roles"],
    });

    return response;
  }

  async findOneByEmail(email: string): Promise<Master | null> {
    return await this.model.findOne({ email });
  }

  async removeRoleFromMaster(roleId: string): Promise<void> {
    await this.model.updateMany(
      { roles: { $in: [roleId] } },
      { $pull: { roles: roleId } },
      { session: this.session },
    );
  }
}
