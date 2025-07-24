import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { GroupMetaData } from "../domains/group.entity";
import { GroupRepo } from "../repos/Group.repo";

@injectable()
export class GroupApplicationService {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {}
  async getTeacherGroups(teacher: Teacher): Promise<Populate<GroupMetaData, "classTypes">[]> {
    const teacherLevelIds = teacher.levels;

    const levels = await this.levelRepo.findManyByIds(teacherLevelIds);

    const currentSchoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      currentSchoolYearIds,
    );

    const groupIds = teacherProfiles.flatMap(teacherProfile => teacherProfile.groups);

    const groups = await this.groupRepo.findManyByIds(groupIds, {
      populate: ["classTypes"],
    });

    return groups;
  }
}
