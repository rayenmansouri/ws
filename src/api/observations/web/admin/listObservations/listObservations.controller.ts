import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { ListObservationsUseCase } from "../../../../../feature/observations/useCases/ListObservations.usecase";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { TeacherRepo } from "../../../../../feature/teachers/domain/Teacher.repo";
import { ID } from "../../../../../types/BaseEntity";
import { ListObservationsResponse, ListObservationsRouteConfig } from "./listObservations.types";

@Controller()
export class ListObservationsController extends BaseController<ListObservationsRouteConfig> {
  constructor(
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListObservationsRouteConfig>): Promise<void | APIResponse> {
    let classId: ID | undefined = undefined;
    if (req.query.classNewId) {
      const classDoc = await this.classRepo.findOneByNewIdOrThrow(
        req.query.classNewId,
        "notFound.class",
      );
      classId = classDoc._id;
    }

    let groupId: ID | undefined = undefined;
    if (req.query.groupNewId) {
      const group = await this.groupRepo.findOneByNewIdOrThrow(
        req.query.groupNewId,
        "notFound.group",
      );
      groupId = group._id;
    }

    let studentId: ID | undefined = undefined;
    if (req.query.studentNewId) {
      const student = await this.studentRepo.findOneByNewIdOrThrow(
        req.query.studentNewId,
        "notFound.student",
      );
      studentId = student._id;
    }

    let teacherId: ID | undefined = undefined;
    if (req.query.teacherNewId) {
      const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
        req.query.teacherNewId,
        "notFound.teacher",
      );
      teacherId = teacher._id;
    }

    const data = await this.listObservationsUseCase.execute(
      {
        classId,
        groupId,
        teacherId,
        studentId,
        observationReasonId: req.query.observationReasonId,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListObservationsResponse>("global.listSuccessfullyRetrieved", data);
  }
}
