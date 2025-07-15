import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { AlertMetaData } from "../../../feature/alertManagement/domain/alert.entity";
import { AlertRepo } from "../../../feature/alertManagement/domain/Alert.repo";
import { StudentProfileRepo } from "../../../feature/students/domain/StudentProfile.repo";
import { Populate } from "./../../../core/populateTypes";
import { Alert } from "./../../../feature/alertManagement/domain/alert.entity";
import { ListOptions } from "./../../../types/types";
import { ResponseWithPagination } from "./../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoAlertRepo extends MongoBaseRepo<AlertMetaData> implements AlertRepo {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("Session") session: ClientSession | null,
    @inject("StudentProfileRepo") private readonly studentProfileRepo: StudentProfileRepo,
  ) {
    super(connection, "alert", session);
  }

  async listAlerts(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<AlertMetaData, "createdBy">>> {
    const filterQuery: FilterQuery<Alert> = {};

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({ status: { $regex: filter.search, $options: "i" } });

      const parsedNumber = Number(filter.search);

      if (!isNaN(parsedNumber)) {
        filterQuery.$or.push({
          $expr: { $eq: [{ $size: "$users" }, parsedNumber] },
        });
      }
    }

    const response = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["createdBy"],
    });

    return response;
  }
}
