import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteObservationUseCase } from "../../../../../feature/observations/useCases/DeleteObservation.usecase";
import { DeleteObservationRouteConfig, DeleteObservationResponse } from "./deleteObservation.types";

@Controller()
export class DeleteObservationController extends BaseController<DeleteObservationRouteConfig> {
  constructor(
    @inject("DeleteObservationUseCase") private deleteObservationUseCase: DeleteObservationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteObservationRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteObservationUseCase.execute({
      observationNewId: req.params.observationNewId,
      userId: req.user._id,
      userType: req.userType as "admin" | "teacher",
    });
    return new SuccessResponse<DeleteObservationResponse>("global.success", response);
  }
}
