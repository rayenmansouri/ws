import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { SmartCalendarScheduleDTO } from "../dtos/SmartCalendarSchedule.dto";
import { SmartCalendarScheduleMapper } from "../mappers/SmartCalendarSchedule.mapper";

@injectable()
export class ListSmartCalendarSchedulesUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
  ) {}

  async execute(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<SmartCalendarScheduleDTO>> {
    const schedules = await this.smartCalendarScheduleRepo.listSchedules(filter, options);

    return {
      docs: schedules.docs.map(schedule => SmartCalendarScheduleMapper.toDTO(schedule)),
      meta: schedules.meta,
    };
  }
}
