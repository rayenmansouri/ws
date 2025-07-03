import { ID } from "./../../../types/BaseEntity";
import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { School, SchoolMetaData } from "../../../feature/schools/domain/school.entity";
import { SchoolRepo } from "../../../feature/schools/domain/School.repo";
import { MongoMasterBaseRepo } from "./MongoMasterBase.repo";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { mongoSchoolModel } from "../schemas/school.schema";

@injectable()
export class MongoSchoolRepo extends MongoMasterBaseRepo<SchoolMetaData> implements SchoolRepo {
  constructor(
    @inject("MasterConnection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, mongoSchoolModel, session);
  }

  async findOneBySubdomainOrThrow(subdomain: string): Promise<SchoolMetaData["entity"]> {
    const school = await this.findOneByField("subdomain", subdomain);

    if (!school) throw new NotFoundError("notfound.school");

    return school;
  }

  async listSchools(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<School>> {
    const filterQuery: FilterQuery<School> = {};

    if (filter.search) {
      filterQuery.$or = [
        { name: { $regex: filter.search, $options: "i" } },
        { subdomain: { $regex: filter.search, $options: "i" } },
      ];
    }

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }

  async decrementSmsSold(tenantId: ID, smsCount: number): Promise<void> {
    await this.model.updateOne(
      { _id: tenantId },
      {
        $inc: { totalSmsSold: -smsCount },
      },
      {
        session: this.session || null,
      },
    );
  }
}
