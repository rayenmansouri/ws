import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddObservationReasonUsecase } from "../../../../../feature/observationsReason/usecases/AddObservationReason.usecase";
import {
  AddObservationReasonRouteConfig,
  AddObservationReasonResponse,
} from "./addObservationReason.types";

@Controller()
export class AddObservationReasonController extends BaseController<AddObservationReasonRouteConfig> {
  constructor(
    @inject("AddObservationReasonUsecase")
    private addObservationReasonUseCase: AddObservationReasonUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddObservationReasonRouteConfig>): Promise<void | APIResponse> {
    await this.addObservationReasonUseCase.execute(req.body);
    return new SuccessResponse<AddObservationReasonResponse>("observationReason.addedSuccessfully");
  }
}
