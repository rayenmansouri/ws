import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import { StudentService } from "../../../../../feature/students/domain/Student.service";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListObservationsByParentRouteConfig,
  ListObservationsByParentResponse,
} from "./listObservationsByParent.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { ListObservationsUseCase } from "../../../../../feature/observations/useCases/ListObservations.usecase";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";

@Controller()
export class ListObservationsByParentController extends BaseController<ListObservationsByParentRouteConfig> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListObservationsByParentRouteConfig>): Promise<void | APIResponse> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      req.query.studentNewId,
      "notFound.student",
    );

    StudentService.ensureStudentIsAssignedToParent(student._id, req.user as unknown as Parent);

    const data = await this.listObservationsUseCase.execute(
      { studentId: student._id, observationReasonId: req.query.observationReasonId },
      { page: req.query.page, limit: req.query.limit },
    );

    const docs = data.docs.map(observation => ({
      ...observation,
      students: [UserMapper.toUserProfileDTO(student)],
    }));

    return new SuccessResponse<ListObservationsByParentResponse>(
      "global.listSuccessfullyRetrieved",
      { docs, meta: data.meta },
    );
  }
}
