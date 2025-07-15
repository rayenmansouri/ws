import { injectable } from "inversify/lib/inversify";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { TeacherDTO } from "../dtos/Teacher.dto";
import { ListOptions } from "../../../types/types";
import { TeacherRepo } from "../domain/Teacher.repo";
import { inject } from "../../../core/container/TypedContainer";
import { TGenderEnum } from "../../users/domain/baseUser.entity";
import { ID } from "../../../types/BaseEntity";
import { RoleRepo } from "../../authorization/domain/Role.repo";
import { TeacherMapper } from "../mappers/Teacher.mapper";
import { TLanguageEnum } from "../../../translation/constants";

@injectable()
export class ListTeachersUseCase {
  constructor(
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("RoleRepo") private roleRepo: RoleRepo,
    @inject("Language") private language: TLanguageEnum,
  ) {}

  async execute(
    filter: {
      search?: string;
      gender?: TGenderEnum;
      level?: ID;
      subjectType?: ID;
      groupType?: ID;
      isArchived?: boolean;
      isActive?: boolean;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<TeacherDTO>> {
    const teachers = await this.teacherRepo.listTeachers(filter, options);

    const roles = await this.roleRepo.findAll();

    return {
      docs: teachers.docs.map(teacher => {
        const teacherRoles = roles.filter(role => teacher.roles.includes(role._id));

        return TeacherMapper.toDTO(teacher, teacherRoles, this.language);
      }),
      meta: teachers.meta,
    };
  }
}
