import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SmartCalendarScheduleRepo } from "../domain/SmartCalendarSchedule.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SMART_CALENDAR_SCHEDULE_STATUS_ENUM } from "../domain/smartCalendarSchedule.entity";
import { Admin } from "../../admins/domain/admin.entity";
import { ScheduleGenerator } from "../domain/ScheduleGenerator.interface";
import { SmartCalendarConfigFactory } from "../factories/SmartCalendarConfig.factory";
import { ID } from "../../../types/BaseEntity";
import { SchoolRepo } from "../../schools/domain/School.repo";

@injectable()
export class GenerateScheduleUseCase {
  constructor(
    @inject("SmartCalendarScheduleRepo")
    private smartCalendarScheduleRepo: SmartCalendarScheduleRepo,
    @inject("ScheduleGenerator") private scheduleGenerator: ScheduleGenerator,
    @inject("SmartCalendarConfigFactory")
    private smartCalendarConfigFactory: SmartCalendarConfigFactory,
    @inject("SchoolRepo") private schoolRepo: SchoolRepo,
  ) {}

  async execute(name: string, admin: Admin, schoolId: ID): Promise<void> {
    await this.smartCalendarScheduleRepo.ensureFieldUniqueness("name", name, "alreadyUsed.name");

    const scheduleInProgress = await this.smartCalendarScheduleRepo.findInProgressSchedule();
    if (scheduleInProgress) throw new BadRequestError("smartCalendar.scheduleAlreadyInProgress");

    const schedule = await this.smartCalendarScheduleRepo.addOne({
      name,
      status: SMART_CALENDAR_SCHEDULE_STATUS_ENUM.IN_PROGRESS,
      generatedByAdmin: admin._id,
    });

    const school = await this.schoolRepo.findOneByIdOrThrow(schoolId, "school.configNotFound");

    const smartCalendarConfig = await this.smartCalendarConfigFactory.create(schedule, school);

    await this.scheduleGenerator.startGeneration(smartCalendarConfig);
  }
}
