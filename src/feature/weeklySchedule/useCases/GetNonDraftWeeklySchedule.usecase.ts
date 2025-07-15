import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TScheduleEntityEnum } from "../../../helpers/constants";
import { School } from "../../schools/domain/school.entity";
import { WeeklySessionDTO } from "../../weeklySessions/dto/weeklySession.dto";
import { WeeklySessionMapper } from "../../weeklySessions/mappers/weeklySession.mapper";
import { enrichedWeeklySessionData } from "../../weeklySessions/repos/WeeklySession.repo";
import { WeeklyScheduleApplicationService } from "../applications/WeeklySchedule.application.service";

type GetWeeklyScheduleRequestDto = {
  entity: TScheduleEntityEnum;
  newId: string;
};

@injectable()
export class GetNonDraftWeeklyScheduleUseCase {
  constructor(
    @inject("WeeklyScheduleApplicationService")
    private weeklyScheduleApplicationService: WeeklyScheduleApplicationService,
    @inject("School") private school: School,
  ) {}

  async execute(data: GetWeeklyScheduleRequestDto): Promise<WeeklySessionDTO[]> {
    const { entity, newId } = data;

    let weeklySessions: enrichedWeeklySessionData[] = [];

    switch (entity) {
      case "teacher":
        weeklySessions = await this.weeklyScheduleApplicationService.getTeacherSchedule(newId, {
          isDraft: false,
        });
        break;
      case "class":
        weeklySessions = await this.weeklyScheduleApplicationService.getClassSchedule(newId, {
          isDraft: false,
        });
        break;
      case "classroom":
        weeklySessions = await this.weeklyScheduleApplicationService.getClassroomSchedule(newId, {
          isDraft: false,
        });
        break;
      case "group":
        weeklySessions = await this.weeklyScheduleApplicationService.getGroupSchedule(newId, {
          isDraft: false,
        });
        break;
      case "student":
        weeklySessions = await this.weeklyScheduleApplicationService.getStudentSchedule(newId, {
          isDraft: false,
        });
        break;
    }
    const schedule = weeklySessions.map(weeklySession =>
      WeeklySessionMapper.toWeeklySessionDto(weeklySession),
    );

    return schedule;
  }
}
