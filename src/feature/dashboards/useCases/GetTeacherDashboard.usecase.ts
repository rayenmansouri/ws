import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { GetScheduleUseCase } from "../../schedules/useCases/GetSchedule.usecase";
import { School } from "../../schools/domain/school.entity";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { UserDashboardDTO } from "../dtos/UserDashboard.dto";

export type GetTeacherDashboardRequest = {
  teacherNewId: string;
};

@injectable()
export class GetTeacherDashboardUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("GetScheduleUseCase") private getScheduleUseCase: GetScheduleUseCase,
    @inject("School") private school: School,
  ) {}

  async execute(dto: GetTeacherDashboardRequest): Promise<UserDashboardDTO> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    const currentDate = getCurrentTimeOfSchool(this.school._id);
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
    const scheduleDetails = await this.getScheduleUseCase.execute({
      entity: "teacher",
      newId: teacher.newId,
      startDate,
      endDate,
    });

    return {
      schedule: scheduleDetails.schedule,
    };
  }
}
