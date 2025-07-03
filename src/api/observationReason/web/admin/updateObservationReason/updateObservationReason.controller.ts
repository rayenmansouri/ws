import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateObservationReasonUseCase } from "../../../../../feature/observationsReason/usecases/UpdateObservationReason.usecase";
import {
  UpdateObservationReasonResponse,
  UpdateObservationReasonRouteConfig,
} from "./updateObservationReason.types";

@Controller()
export class UpdateObservationReasonController extends BaseController<UpdateObservationReasonRouteConfig> {
  constructor(
    @inject("UpdateObservationReasonUseCase")
    private updateObservationReasonUseCase: UpdateObservationReasonUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateObservationReasonRouteConfig>): Promise<void | APIResponse> {
    await this.updateObservationReasonUseCase.execute(req.params.observationReasonNewId, req.body);
    return new SuccessResponse<UpdateObservationReasonResponse>(
      "observationReason.updatedSuccessfully",
    );
  }
}
