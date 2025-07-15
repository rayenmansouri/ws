import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { HOMEWORK_STATUS_ENUM } from "../../../features/homework/constants/shared/addHomework.constants";
import { ListPostsOfUserUseCase } from "../../announcements/useCases/ListPostsOfUser.usecase";
import { Role } from "../../authorization/domain/role.entity";
import { ListHomeworkUseCase } from "../../homeworks/useCases/ListHomeworks.usecase";
import { ListObservationsUseCase } from "../../observations/useCases/ListObservations.usecase";
import { GetScheduleUseCase } from "../../schedules/useCases/GetSchedule.usecase";
import { School } from "../../schools/domain/school.entity";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { UserDashboardDTO } from "../dtos/UserDashboard.dto";

export type GetTeacherDashboardRequest = {
  teacherNewId: string;
};

@injectable()
export class GetTeacherDashboardUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("GetScheduleUseCase") private getScheduleUseCase: GetScheduleUseCase,
    @inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase,
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
    @inject("ListPostsOfUserUseCase") private listPostsOfUserUseCase: ListPostsOfUserUseCase,
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

    const homeworks = await this.listHomeworkUseCase.execute({
      filter: {
        teacherId: teacher._id,
        status: HOMEWORK_STATUS_ENUM.TODO,
      },
      options: {
        limit: 4,
        page: 1,
      },
    });

    const observations = await this.listObservationsUseCase.execute(
      {
        teacherId: teacher._id,
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
        user: teacher as unknown as Omit<BaseUser, "roles"> & { roles: Role[] },
        userType: END_USER_ENUM.TEACHER,
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
