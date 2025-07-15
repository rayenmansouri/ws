import { ClientSession, Connection, FilterQuery } from "mongoose";
import {
  BankCheck,
  BankCheckMetaData,
} from "../../../feature/studentPayments/domain/bankCheck.entity";
import { BankCheckRepo } from "../../../feature/studentPayments/domain/BankCheck.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { inject } from "../../../core/container/TypedContainer";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoBankCheckRepo extends MongoBaseRepo<BankCheckMetaData> implements BankCheckRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "bankCheck", session);
  }

  async listBankChecks(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<BankCheck>> {
    const filterQuery: FilterQuery<BankCheck> = {};

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({ fullName: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ checkNumber: { $regex: filter.search, $options: "i" } });
    }

    const response = await this.findManyWithPagination(filterQuery, options);

    return response;
  }
}
