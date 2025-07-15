import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";

export type ArchiveTeacherUseCaseRequestDto = {
  teacherNewId: string;
  tenantId: string;
};

@injectable()
export class ArchiveTeacherUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
  ) {}

  async execute(dto: ArchiveTeacherUseCaseRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
      {
        populate: ["levels"],
      },
    );
    if (teacher.isArchived) throw new BadRequestError("teacher.alreadyArchived");

    const currentSchoolYearIds = teacher.levels.map(level => level.currentSchoolYear._id);

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      currentSchoolYearIds,
    );

    if (teacherProfiles.some(profile => profile.classes.length > 0))
      throw new BadRequestError("teacher.cannotArchiveTeacherAssignedToClass");

    if (teacherProfiles.some(profile => profile.groups.length > 0))
      throw new BadRequestError("teacher.cannotArchiveTeacherAssignedToGroup");

    await this.teacherRepo.updateOneById(teacher._id, {
      isArchived: true,
      archivedAt: getCurrentTimeOfSchool(dto.tenantId),
    });
  }
}
