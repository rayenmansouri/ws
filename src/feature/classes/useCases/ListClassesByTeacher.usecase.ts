import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { paginateResult } from "../../../helpers/paginateResult";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { ClassRepo } from "../domain/Class.repo";
import { ClassDTO } from "../dto/Classes.dto";
import { ClassMapper } from "../mappers/Classes.mapper";

@injectable()
export class ListClassesByTeacherUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
  ) {}
  async execute(
    query: Partial<{ search: string } & ListOptions>,
    teacher: Teacher,
  ): Promise<ResponseWithPagination<ClassDTO>> {
    const teacherLevel = await this.levelRepo.findManyByIds(teacher.levels);
    const teacherProfile = await this.teacherProfileRepo.getTeacherProfilesBySchoolYears(
      teacher._id,
      teacherLevel.map(level => level.currentSchoolYear._id),
      { populate: ["classes"] },
    );

    const teacherClasses = teacherProfile.flatMap(profile =>
      profile.classes.map(classDoc => ClassMapper.toClassDto(classDoc)),
    );

    return paginateResult(teacherClasses, query.limit, query.page);
  }
}
