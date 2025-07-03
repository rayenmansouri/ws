import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { ListObservationsUseCase } from "../../../../../feature/observations/useCases/ListObservations.usecase";
import { ID } from "../../../../../types/BaseEntity";
import {
  ListObservationsByTeacherResponse,
  ListObservationsByTeacherRouteConfig,
} from "./listObservationsByTeacher.types";

@Controller()
export class ListObservationsByTeacherController extends BaseController<ListObservationsByTeacherRouteConfig> {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListObservationsByTeacherRouteConfig>): Promise<void | APIResponse> {
    let classId: ID | undefined = undefined;
    let groupId: ID | undefined = undefined;

    if (req.query.classNewId) {
      const classDoc = await this.classRepo.findOneByNewIdOrThrow(
        req.query.classNewId,
        "notFound.class",
      );
      classId = classDoc._id;
    }

    if (req.query.groupNewId) {
      const groupDoc = await this.groupRepo.findOneByNewIdOrThrow(
        req.query.groupNewId,
        "notFound.group",
      );
      groupId = groupDoc._id;
    }

    const data = await this.listObservationsUseCase.execute(
      {
        teacherId: req.user._id,
        classId,
        groupId,
        observationReasonId: req.query.observationReasonId,
      },
      { page: req.query.page, limit: req.query.limit },
    );
    return new SuccessResponse<ListObservationsByTeacherResponse>(
      "global.listSuccessfullyRetrieved",
      data,
    );
  }
}
