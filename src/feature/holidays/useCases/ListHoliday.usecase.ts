import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { HolidayRepo } from "../domain/Holiday.repo";
import { HolidayDto } from "../dto/Holiday.dto";
import { HolidayMapper } from "../maper/Holiday.mapper";

@injectable()
export class ListHolidayUseCase {
  constructor(@inject("HolidayRepo") private holidayRepo: HolidayRepo) {}

  async execute(
    query: Partial<{ name: string } & ListOptions>,
  ): Promise<ResponseWithPagination<HolidayDto>> {
    const holidays = await this.holidayRepo.list(query);
    const docs = holidays.docs.map(doc => {
      return HolidayMapper.toHolidayDto({
        ...doc,
        startDate: doc.start,
        endDate: doc.end,
      });
    });
    return { docs, meta: holidays.meta };
  }
}
