import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TScheduleEntityEnum } from "../../../helpers/constants";
import { enrichedSessionData } from "../../sessionManagement/domain/Session.repo";
import { SessionDTO } from "../../sessionManagement/dtos/Session.dto";
import { SessionMapper } from "../../sessionManagement/mapper/Session.mapper";
import { ScheduleApplicationService } from "../applications/Schedule.application.service";
import { HolidayRepo } from "../../holidays/domain/Holiday.repo";
import { HolidayMapper } from "../../holidays/maper/Holiday.mapper";
import { HolidayInScheduleDto } from "../../holidays/dto/Holiday.dto";
import { TAttendanceEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { BadRequestError } from "../../../core/ApplicationErrors";

type GetScheduleRequestDto = {
  entity: TScheduleEntityEnum;
  newId: string;
  startDate: Date;
  endDate: Date;
};

@injectable()
export class GetScheduleUseCase {
  constructor(
    @inject("ScheduleApplicationService")
    private ScheduleApplicationService: ScheduleApplicationService,
    @inject("HolidayRepo") private holidayRepo: HolidayRepo,
  ) {}

  async execute(
    data: GetScheduleRequestDto,
  ): Promise<{ schedule: SessionDTO[]; holidays: HolidayInScheduleDto[] }> {
    let sessions: (enrichedSessionData & {
      attendance: TAttendanceEnum | null;
    })[] = [];

    switch (data.entity) {
      case "teacher":
        sessions = await this.ScheduleApplicationService.getTeacherSchedule(data.newId, data);
        break;
      case "class":
        sessions = await this.ScheduleApplicationService.getClassSchedule(data.newId, data);
        break;
      case "classroom":
        sessions = await this.ScheduleApplicationService.getClassroomSchedule(data.newId, data);
        break;
      case "group":
        sessions = await this.ScheduleApplicationService.getGroupSchedule(data.newId, data);
        break;
      case "student":
        sessions = await this.ScheduleApplicationService.getStudentSchedule(data.newId, data);
        break;
      default:
        throw new BadRequestError("Invalid entity type");
    }

    const holidays = await this.holidayRepo.findManyByRange(data.startDate, data.endDate);

    const holidayDtos = holidays.flatMap(holiday => HolidayMapper.toHolidayScheduleDto(holiday));
    const schedule = sessions.map(session => SessionMapper.toSessionDTO(session));

    return { schedule, holidays: holidayDtos };
  }
}
