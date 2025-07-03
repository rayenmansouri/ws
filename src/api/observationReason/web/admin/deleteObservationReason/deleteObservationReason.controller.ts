import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteObservationReasonUseCase } from "../../../../../feature/observationsReason/usecases/DeleteObservationReason.usecase";
import {
  DeleteObservationReasonResponse,
  DeleteObservationReasonRouteConfig,
} from "./deleteObservationReason.types";

@Controller()
export class DeleteObservationReasonController extends BaseController<DeleteObservationReasonRouteConfig> {
  constructor(
    @inject("DeleteObservationReasonUseCase")
    private deleteObservationReasonUseCase: DeleteObservationReasonUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteObservationReasonRouteConfig>): Promise<void | APIResponse> {
    await this.deleteObservationReasonUseCase.execute(req.params.observationReasonNewId);
    return new SuccessResponse<DeleteObservationReasonResponse>(
      "observationReason.deletedSuccessfully",
    );
  }
}
