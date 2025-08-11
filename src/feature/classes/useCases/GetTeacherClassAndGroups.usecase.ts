import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { EntityDto } from "../../entity/dto/entity.dto";

type GetTeacherClassAndGroupsRequest = {
  teacherNewId: string;
};

type ClassAndGroupResponse = (EntityDto & { isGroup: boolean })[];

@injectable()
export class GetTeacherClassAndGroupsUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
  ) {}

  async execute(params: GetTeacherClassAndGroupsRequest): Promise<ClassAndGroupResponse> {
    const { teacherNewId } = params;
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(teacherNewId, "notFound.teacher", {
      populate: ["levels"],
    });

    const schoolYearIds = teacher.levels.map(level => level.currentSchoolYear._id);

    const teacherProfiles = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      schoolYearIds,
      { populate: ["classes", "groups"] },
    );

    const classes = teacherProfiles.flatMap(teacherProfile =>
      teacherProfile.classes.map(classDoc => ({
        ...EntityMapper.toEntityDto(classDoc),
        isGroup: false,
      })),
    );

    const groups = teacherProfiles.flatMap(teacherProfile =>
      teacherProfile.groups.map(group => ({
        ...EntityMapper.toEntityDto(group),
        isGroup: true,
      })),
    );

    return classes.concat(groups);
  }
}
