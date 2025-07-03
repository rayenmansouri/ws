import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetOneObservationUseCase } from "../../../../../feature/observations/useCases/GetOneObservation.usecase";
import { GetOneObservationRouteConfig, GetOneObservationResponse } from "./getOneObservation.types";

@Controller()
export class GetOneObservationController extends BaseController<GetOneObservationRouteConfig> {
  constructor(
    @inject("GetOneObservationUseCase") private getOneObservationUseCase: GetOneObservationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetOneObservationRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      user: req.user,
      type: req.userType as TEndUserEnum,
    };

    const response = await this.getOneObservationUseCase.execute(
      req.params.observationNewId,
      userDetails,
    );

    return new SuccessResponse<GetOneObservationResponse>("global.success", response);
  }
}
