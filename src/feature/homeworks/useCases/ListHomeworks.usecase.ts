import { injectable } from "inversify";
import { EMPTY_RESPONSE_WITH_PAGINATION } from "../../../constants/emptyResponseWithPagination";
import { inject } from "../../../core/container/TypedContainer";
import { THomeworkStatusEnum } from "../../../features/homework/constants/shared/addHomework.constants";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { Student } from "../../students/domain/student.entity";
import { HomeworkRepo } from "../domain/Homework.repo";
import { HomeworkDTO } from "../dtos/homework.dto";
import { HomeworkMapper } from "../mappers/Homework.mapper";

export type listHomeworksRequestDto = {
  filter: {
    schoolYearId?: ID;
    student?: Student;
    teacherId?: ID;
    classId?: ID;
    groupId?: ID;
    search?: string;
    status?: THomeworkStatusEnum;
  };
  options: ListOptions;
};

@injectable()
export class ListHomeworkUseCase {
  constructor(
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(dto: listHomeworksRequestDto): Promise<ResponseWithPagination<HomeworkDTO>> {
    let studentClassId: ID | null = null;
    let studentGroupIds: ID[] | null = null;

    if (dto.filter.schoolYearId)
      await this.schoolYearRepo.findOneByIdOrThrow(dto.filter.schoolYearId, "notFound.schoolYear");

    if (dto.filter.student) {
      if (dto.filter.schoolYearId) {
        const { classId, groupIds } =
          await this.studentApplicationService.getAcademicDetailsOfSchoolYear(
            dto.filter.student._id,
            dto.filter.schoolYearId,
          );

        if (!classId) return EMPTY_RESPONSE_WITH_PAGINATION<HomeworkDTO>();

        studentClassId = classId;
        studentGroupIds = groupIds;
      } else {
        const { classId, groupIds } =
          await this.studentApplicationService.getCurrentAcademicDetails(dto.filter.student);
        if (!classId) return EMPTY_RESPONSE_WITH_PAGINATION<HomeworkDTO>();
        studentClassId = classId;
        studentGroupIds = groupIds;
      }
    }

    const data = await this.homeworkRepo.listHomeworks(
      {
        teacherIds: dto.filter.teacherId ? [dto.filter.teacherId] : undefined,
        classId: studentClassId || dto.filter.classId,
        groupIds: studentGroupIds || (dto.filter.groupId ? [dto.filter.groupId] : undefined),
        status: dto.filter.status,
        search: dto.filter.search,
      },
      {
        ...dto.options,
        populate: ["teacher", "subSubjectType", "subjectType", "class", "classGroup", "group"],
      },
    );

    const homeworkDTOs = data.docs.map(homework => HomeworkMapper.toHomeworkDTO(homework));

    return {
      docs: homeworkDTOs,
      meta: data.meta,
    };
  }
}
