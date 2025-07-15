import { injectable } from "inversify";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { inject } from "../../../core/container/TypedContainer";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { HOMEWORK_STATUS_ENUM } from "../../../features/homework/constants/shared/addHomework.constants";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { StudentService } from "../../students/domain/Student.service";
import { School } from "../../schools/domain/school.entity";
import { GetScheduleUseCase } from "../../schedules/useCases/GetSchedule.usecase";
import { ListHomeworkUseCase } from "../../homeworks/useCases/ListHomeworks.usecase";
import { ListObservationsUseCase } from "../../observations/useCases/ListObservations.usecase";
import { ListPostsOfUserUseCase } from "../../announcements/useCases/ListPostsOfUser.usecase";
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
    @inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase,
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
    @inject("ListPostsOfUserUseCase") private listPostsOfUserUseCase: ListPostsOfUserUseCase,
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

    const homeworks = await this.listHomeworkUseCase.execute({
      filter: {
        student,
        status: HOMEWORK_STATUS_ENUM.TODO,
      },
      options: {
        limit: 4,
        page: 1,
      },
    });

    const observations = await this.listObservationsUseCase.execute(
      {
        studentId: student._id,
      },
      {
        limit: 4,
        page: 1,
      },
    );

    const posts = await this.listPostsOfUserUseCase.execute(
      {
        skipPinned: true,
      },
      {
        user: parent as unknown as Omit<BaseUser, "roles"> & { roles: Role[] },
        userType: END_USER_ENUM.PARENT,
      },
      {
        limit: 2,
        page: 1,
      },
    );

    return {
      homeworks: homeworks.docs,
      schedule: scheduleDetails.schedule,
      observations: observations.docs,
      posts: posts.docs,
    };
  }
}
