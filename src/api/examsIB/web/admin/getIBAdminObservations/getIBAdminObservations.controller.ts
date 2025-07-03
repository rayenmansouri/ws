import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBAdminObservationsUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBAdminObservations.usecase";
import {
  GetIBAdminObservationsRouteConfig,
  GetIBAdminObservationsResponse,
} from "./getIBAdminObservations.types";

@Controller()
export class GetIBAdminObservationsController extends BaseController<GetIBAdminObservationsRouteConfig> {
  constructor(
    @inject("GetIBAdminObservationsUseCase")
    private getIBAdminObservationsUseCase: GetIBAdminObservationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBAdminObservationsRouteConfig>): Promise<void | APIResponse> {
    const observations = await this.getIBAdminObservationsUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetIBAdminObservationsResponse>("global.success", observations);
  }
}
