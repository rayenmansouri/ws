import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { GetScheduleUseCase } from "../../schedules/useCases/GetSchedule.usecase";
import { School } from "../../schools/domain/school.entity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentService } from "../../students/domain/Student.service";

import { UserDashboardDTO } from "../dtos/UserDashboard.dto";

export type ParentDashboardRequest = {
  parentNewId: string;
  studentNewId: string;
};

@injectable()
export class GetParentDashboardUseCase {
  constructor(
    @inject("ParentRepo") private parentRepo: ParentRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("GetScheduleUseCase") private getScheduleUseCase: GetScheduleUseCase,

    @inject("School") private school: School,
  ) {}

  async execute(dto: ParentDashboardRequest): Promise<UserDashboardDTO> {
    const parent = await this.parentRepo.findOneByNewIdOrThrow(dto.parentNewId, "notFound.parent");

    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    StudentService.ensureParentIsAssignedToStudent(parent, student);

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
