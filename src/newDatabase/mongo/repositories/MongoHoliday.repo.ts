import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Holiday, HolidayMetaData } from "../../../feature/holidays/domain/holiday.entity";
import { HolidayRepo } from "../../../feature/holidays/domain/Holiday.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";
import { ListOptions } from "../../../types/types";
import { Populate } from "../../../core/populateTypes";

export class MongoHolidayRepo extends MongoBaseRepo<HolidayMetaData> implements HolidayRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "holiday", session);
  }

  async findManyByRange(startDate: Date, endDate: Date): Promise<Holiday[]> {
    return this.model
      .find({
        start: { $lte: endDate },
        end: { $gte: startDate },
      })
      .lean();
  }

  async list(
    query: Partial<{ name: string } & ListOptions>,
  ): Promise<ResponseWithPagination<Populate<HolidayMetaData, "levels">>> {
    const filter: FilterQuery<Holiday> = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }
    const holidays = await this.findManyWithPagination(filter, {
      page: query.page,
      limit: query.limit,
      populate: ["levels"],
    });

    return holidays;
  }
  async findOneByRange(startDate: Date, endDate: Date): Promise<Holiday | null> {
    return this.model
      .findOne({
        start: { $lte: endDate },
        end: { $gte: startDate },
      })
      .lean();
  }
}
