import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { EventDispatcher } from "../../../core/domainEvents/EventDispatcher";
import { FileManager } from "../../../core/fileManager/FileManager";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { NotificationSettingsService } from "../../notifications/NotificationSettings.service";
import { School } from "../../schools/domain/school.entity";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { AddBaseUserRequest, BaseAddUserUseCase } from "../../users/useCases/BaseAddUser.usecase";
import { Teacher } from "../domain/teacher.entity";
import { TeacherRepo } from "../domain/Teacher.repo";
import { TeacherProfileRepo } from "../domain/TeacherProfile.repo";

type AddTeacherRequest = {
  levels: ID[];
  subjectTypes?: ID[];
  groupTypes?: ID[];
} & AddBaseUserRequest;

@injectable()
export class AddTeacherUseCase extends BaseAddUserUseCase<AddTeacherRequest, Teacher> {
  constructor(
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("NotificationSettingsService")
    notificationSettingsService: NotificationSettingsService,
    @inject("RoleRepo") protected roleRepo: RoleRepo,
    @inject("EventDispatcher") eventDispatcher: EventDispatcher,
  ) {
    super(
      fileManager,
      END_USER_ENUM.TEACHER,
      school,
      notificationSettingsService,
      roleRepo,
      eventDispatcher,
    );
  }

  protected async addUserToDB(
    teacherDetails: AddTeacherRequest,
    baseUserDetails: Omit<BaseUser, keyof BaseEntity>,
  ): Promise<Teacher> {
    return await this.teacherRepo.addOne({
      ...baseUserDetails,
      levels: teacherDetails.levels,
      subjectTypes: teacherDetails.subjectTypes || [],
      groupTypes: teacherDetails.groupTypes || [],
      notAvailableTimes: [],
      maxDaysPerWeek: null,
      maxGapsPerDay: null,
      maxHoursPerDay: null,
      preferredClassroom: null,
    });
  }

  protected async preAddUser(userDetails: AddTeacherRequest): Promise<void> {
    const roleIds = userDetails.roles;
    if (roleIds.length > 0) {
      await this.roleRepo.findTeacherRoleByIdsOrThrow(roleIds);
    }
    await this.levelRepo.findManyByIdsOrThrow(userDetails.levels, "notFound.level");

    if (userDetails.subjectTypes)
      await this.subjectTypeRepo.findManyByIdsOrThrow(
        userDetails.subjectTypes,
        "notFound.subjectType",
      );

    if (userDetails.groupTypes)
      await this.groupTypeRepo.findManyByIdsOrThrow(userDetails.groupTypes, "notFound.groupType");
  }

  protected async postAddUser(
    teacher: Teacher,
    addTeacherDetails: AddTeacherRequest,
  ): Promise<void> {
    const levels = await this.levelRepo.findManyByIds(addTeacherDetails.levels);

    const teacherProfilePayload = levels.map(level => ({
      teacher: teacher._id,
      schoolYear: level.currentSchoolYear._id,
      classes: [],
      groups: [],
    }));

    await this.teacherProfileRepo.addMany(teacherProfilePayload);
  }
}
