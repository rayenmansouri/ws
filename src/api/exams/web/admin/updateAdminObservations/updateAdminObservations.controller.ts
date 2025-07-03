import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateAdminObservationsUseCase } from "../../../../../feature/examGrade/useCases/UpdateAdminObservations.usecase";
import {
  UpdateAdminObservationsRouteConfig,
  UpdateAdminObservationsResponse,
} from "./updateAdminObservations.types";

@Controller()
export class UpdateAdminObservationsController extends BaseController<UpdateAdminObservationsRouteConfig> {
  constructor(
    @inject("UpdateAdminObservationsUseCase")
    private updateAdminObservationsUseCase: UpdateAdminObservationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateAdminObservationsRouteConfig>): Promise<void | APIResponse> {
    await this.updateAdminObservationsUseCase.execute(
      req.params.classNewId,
      req.body.termNewId,
      req.body.adminObservations,
    );

    return new SuccessResponse<UpdateAdminObservationsResponse>("global.success");
  }
}
