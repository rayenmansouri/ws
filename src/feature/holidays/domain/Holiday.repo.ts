import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { Holiday, HolidayMetaData } from "./holiday.entity";

export abstract class HolidayRepo extends BaseRepo<HolidayMetaData> {
  abstract findOneByRange(startDate: Date, endDate: Date): Promise<Holiday | null>;
  abstract findManyByRange(startDate: Date, endDate: Date): Promise<Holiday[]>;
  abstract list(
    query: Partial<{ name: string }>,
  ): Promise<ResponseWithPagination<Populate<HolidayMetaData, "levels">>>;
}
