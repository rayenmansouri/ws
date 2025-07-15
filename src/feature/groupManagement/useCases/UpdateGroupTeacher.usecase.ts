import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { isIncludeArrayIds } from "../../../helpers/functionsUtils";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { GroupRepo } from "../repos/Group.repo";

type UpdateGroupTeacherParams = {
  groupNewId: string;
  teacherNewId: string;
};

@injectable()
export class UpdateGroupTeacherUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
  ) {}

  async execute(data: UpdateGroupTeacherParams): Promise<void> {
    const { groupNewId, teacherNewId } = data;

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher");

    //TODO move this logic to teacher service after merging refactor/classManagement
    if (!isIncludeArrayIds(teacher.groupTypes, group.groupType._id)) {
      throw new BadRequestError("invalid.teacher");
    }

    const oldTeacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      group.teacher,
      group.schoolYears,
    );

    const newTeacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      group.schoolYears,
    );

    await Promise.all(
      newTeacherProfiles.map(newTeacherProfile =>
        this.teacherProfileRepo.updateOneById(newTeacherProfile._id, {
          groups: [...newTeacherProfile.groups, group._id],
        }),
      ),
    );

    await this.groupRepo.updateOneById(group._id, { teacher: teacher._id });

    await Promise.all(
      oldTeacherProfiles.map(oldTeacherProfile =>
        this.teacherProfileRepo.updateOneById(oldTeacherProfile._id, {
          groups: oldTeacherProfile.groups.filter(groupId => groupId !== group._id),
        }),
      ),
    );

    await this.sessionRepo.assignTeacherToSessionGroup(group._id, teacher._id);
    await this.weeklySessionRepo.assignTeacherToWeeklySessionGroup(group._id, teacher._id);

    return;
  }
}
