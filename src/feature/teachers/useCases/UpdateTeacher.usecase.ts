import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager } from "../../../core/fileManager/FileManager";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { School } from "../../schools/domain/school.entity";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { CentralUserRepo } from "../../users/domain/CentralUser.repo";
import {
  BaseUpdateUserUseCase,
  UpdateBaseUserRequest,
} from "../../users/useCases/BaseUpdateUser.usecase";
import { Teacher } from "../domain/teacher.entity";
import { TeacherRepo } from "../domain/Teacher.repo";
import { TeacherProfile } from "../domain/teacherProfile.entity";
import { TeacherProfileRepo } from "../domain/TeacherProfile.repo";
import { GroupTypeRepo } from "../../groupManagement/repos/GroupType.repo";

export type UpdateTeacherRequest = {
  levels?: ID[];
  subjectTypes?: ID[];
  groupTypes?: ID[];
  notAvailableTimes?: { day: number; hours: number[]; isAvailable: boolean }[];
} & UpdateBaseUserRequest;

@injectable()
export class UpdateTeacherUseCase extends BaseUpdateUserUseCase<UpdateTeacherRequest, Teacher> {
  constructor(
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("GroupTypeRepo") private groupTypeRepo: GroupTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("FileManager") fileManager: FileManager,
    @inject("School") school: School,
    @inject("CentralUserRepo") centralUserRepo: CentralUserRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
  ) {
    super(fileManager, END_USER_ENUM.TEACHER, school, centralUserRepo);
  }

  protected async findUserByNewId(newId: string): Promise<Teacher> {
    return await this.teacherRepo.findOneByNewIdOrThrow(newId, "notFound.teacher");
  }

  protected async updateUserInDB(
    teacher: Teacher,
    updatePayload: Partial<Teacher>,
  ): Promise<Teacher> {
    const updatedTeacher = (await this.teacherRepo.updateOneById(teacher._id, updatePayload))!;
    return updatedTeacher;
  }

  protected async preUpdateUser(
    teacher: Teacher,
    userDetails: UpdateTeacherRequest,
  ): Promise<void> {
    if (userDetails.roles) await this.roleRepo.findTeacherRoleByIdsOrThrow(userDetails.roles);

    if (userDetails.levels) {
      const newLevelIds = userDetails.levels;
      const allLevels = await this.levelRepo.findAll();

      const newLevels = allLevels.filter(level => newLevelIds.includes(level._id));
      if (newLevels.length !== newLevelIds.length) throw new BadRequestError("notFound.level");

      const teacherLevels = allLevels.filter(level => teacher.levels.includes(level._id));
      const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
        teacher._id,
        teacherLevels.map(level => level.currentSchoolYear._id),
      );

      const levelIdsToRemove = teacher.levels.filter(level => !newLevelIds.includes(level));

      if (levelIdsToRemove.length > 0) {
        const levelToRemoveSchoolYears = teacherLevels
          .filter(level => levelIdsToRemove.includes(level._id))
          .map(level => level.currentSchoolYear._id);

        const teacherProfilesOfLevels = teacherProfiles.filter(profile =>
          levelToRemoveSchoolYears.includes(profile.schoolYear),
        );

        const classesIds = teacherProfilesOfLevels.flatMap(profile => profile.classes);

        if (classesIds.length > 0)
          throw new BadRequestError("teacher.cannotRemoveLevelWithClasses");

        await this.teacherProfileRepo.deleteManyByIds(
          teacherProfilesOfLevels.map(profile => profile._id),
        );
      }

      const levelsToAdd = newLevelIds.filter(level => !teacher.levels.includes(level));

      if (levelsToAdd.length > 0) {
        const levelsToAddDoc = await this.levelRepo.findManyByIdsOrThrow(
          levelsToAdd,
          "notFound.level",
        );

        const payload: Omit<TeacherProfile, keyof BaseEntity>[] = levelsToAddDoc.map(level => ({
          teacher: teacher._id,
          schoolYear: level.currentSchoolYear._id,
          classes: [],
          groups: [],
        }));

        await this.teacherProfileRepo.addMany(payload);
      }
    }

    if (userDetails.groupTypes) {
      await this.groupTypeRepo.findManyByIdsOrThrow(userDetails.groupTypes, "notFound.groupType");
    }

    if (userDetails.subjectTypes)
      await this.subjectTypeRepo.findManyByIdsOrThrow(
        userDetails.subjectTypes,
        "notFound.subjectType",
      );
  }

  protected async postUpdateUser(): Promise<void> {
    // Nothing additional needed after update
  }
}
