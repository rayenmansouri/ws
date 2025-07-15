import { GetAlertDetailsUseCase } from "./../../../../../feature/alertManagement/useCases/GetAlertDetails.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAlertDetailsRouteConfig, GetAlertDetailsResponse } from "./getAlertDetails.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetAlertDetailsController extends BaseController<GetAlertDetailsRouteConfig> {
  constructor(
    @inject("GetAlertDetailsUseCase")
    private readonly getAlertDetailsUseCase: GetAlertDetailsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAlertDetailsRouteConfig>): Promise<void | APIResponse> {
    const alertDetails = await this.getAlertDetailsUseCase.execute(req.params.alertNewId);

    return new SuccessResponse<GetAlertDetailsResponse>("global.success", alertDetails);
  }
}
