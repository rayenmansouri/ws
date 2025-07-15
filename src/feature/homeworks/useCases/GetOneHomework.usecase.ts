import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { ForbiddenError, InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { HomeworkApplicationService } from "../applicationServices/homework.application.service";
import { HomeworkRepo } from "../domain/Homework.repo";
import { HomeworkDTO } from "../dtos/homework.dto";
import { HomeworkMapper } from "../mappers/Homework.mapper";

@injectable()
export class GetOneHomeworkUseCase {
  constructor(
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("HomeworkApplicationService")
    private homeworkApplicationService: HomeworkApplicationService,
  ) {}

  async execute(
    homeworkNewId: string,
    userDetails: { user: Omit<BaseUser, "roles"> & { roles: Role[] }; type: TEndUserEnum },
  ): Promise<HomeworkDTO> {
    const homework = await this.homeworkRepo.findOneByNewIdOrThrow(
      homeworkNewId,
      "notFound.homework",
      {
        populate: ["class", "group", "teacher", "classGroup", "subSubjectType", "subjectType"],
      },
    );

    const schoolYearIds = homework.class?.schoolYear
      ? [homework.class.schoolYear]
      : homework.group?.schoolYears;

    if (!schoolYearIds) throw new InternalError("notFound.schoolYear");

    const isUserAllowedToViewHomework =
      await this.homeworkApplicationService.isUserAllowedToViewHomework(
        userDetails,
        {
          class: homework.class?._id || null,
          group: homework.group?._id || null,
          teacher: homework.teacher?._id || null,
        },
        schoolYearIds,
      );

    if (!isUserAllowedToViewHomework) throw new ForbiddenError("global.accessDenied");

    return HomeworkMapper.toHomeworkDTO(homework);
  }
}
