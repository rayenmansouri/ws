import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import {
  ListHomeworkUseCase,
  listHomeworksRequestDto,
} from "../../../../../feature/homeworks/useCases/ListHomeworks.usecase";
import { Student } from "../../../../../feature/students/domain/student.entity";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { TeacherRepo } from "../../../../../feature/teachers/domain/Teacher.repo";
import { ID } from "../../../../../types/BaseEntity";
import { ListHomeworksResponse, ListHomeworksRouteConfig } from "./listHomeworks.types";

@Controller()
export class ListHomeworksController extends BaseController<ListHomeworksRouteConfig> {
  constructor(
    @inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListHomeworksRouteConfig>): Promise<APIResponse> {
    let student: Student | undefined;
    let classId: ID | undefined;
    let teacherId: ID | undefined;
    let groupId: ID | undefined;

    if (req.query.studentNewId)
      student = await this.studentRepo.findOneByNewIdOrThrow(
        req.query.studentNewId,
        "notFound.student",
      );

    if (req.query.classNewId)
      classId = (await this.classRepo.findOneByNewIdOrThrow(req.query.classNewId, "notFound.class"))
        ._id;

    if (req.query.teacherNewId)
      teacherId = (
        await this.teacherRepo.findOneByNewIdOrThrow(req.query.teacherNewId, "notFound.teacher")
      )._id;

    if (req.query.groupNewId)
      groupId = (await this.groupRepo.findOneByNewIdOrThrow(req.query.groupNewId, "notFound.group"))
        ._id;

    const dto: listHomeworksRequestDto = {
      filter: {
        student,
        classId,
        teacherId,
        groupId,
        search: req.query.search,
        status: req.query.status,
        schoolYearId: req.query.schoolYearId,
      },
      options: {
        limit: req.query.limit,
        page: req.query.page,
      },
    };

    const response = await this.listHomeworkUseCase.execute(dto);

    return new SuccessResponse<ListHomeworksResponse>("global.listSuccessfullyRetrieved", response);
  }
}
