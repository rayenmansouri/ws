import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { GetScheduleUseCase } from "../../schedules/useCases/GetSchedule.usecase";
import { School } from "../../schools/domain/school.entity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { UserDashboardDTO } from "../dtos/UserDashboard.dto";

export type GetStudentDashboardRequest = {
  studentNewId: string;
};

@injectable()
export class GetStudentDashboardUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("GetScheduleUseCase") private getScheduleUseCase: GetScheduleUseCase,
    @inject("School") private school: School,
  ) {}

  async execute(dto: GetStudentDashboardRequest): Promise<UserDashboardDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    const currentDate = getCurrentTimeOfSchool(this.school._id);
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);
    const scheduleDetails = await this.getScheduleUseCase.execute({
      entity: "student",
      newId: student.newId,
      startDate,
      endDate,
    });

    return {
      schedule: scheduleDetails.schedule,
    };
  }
}
