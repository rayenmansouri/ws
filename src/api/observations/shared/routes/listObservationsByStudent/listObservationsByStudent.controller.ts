import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListObservationsUseCase } from "../../../../../feature/observations/useCases/ListObservations.usecase";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import {
  ListObservationsByStudentResponse,
  ListObservationsByStudentRouteConfig,
} from "./listObservationsByStudent.types";

@Controller()
export class ListObservationsByStudentController extends BaseController<ListObservationsByStudentRouteConfig> {
  constructor(
    @inject("ListObservationsUseCase") private listObservationsUseCase: ListObservationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListObservationsByStudentRouteConfig>): Promise<void | APIResponse> {
    const data = await this.listObservationsUseCase.execute(
      { studentId: req.user._id, observationReasonId: req.query.observationReasonId },
      { page: req.query.page, limit: req.query.limit },
    );
    const docs = data.docs.map(observation => ({
      ...observation,
      students: [UserMapper.toUserProfileDTO(req.user)],
    }));

    return new SuccessResponse<ListObservationsByStudentResponse>(
      "global.listSuccessfullyRetrieved",
      { docs, meta: data.meta },
    );
  }
}
