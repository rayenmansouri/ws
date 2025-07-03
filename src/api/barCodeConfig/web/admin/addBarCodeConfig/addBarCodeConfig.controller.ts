import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddBarCodeConfigUseCase } from "../../../../../feature/barCode/useCases/AddBarCodeConfig.usecase";
import { AddBarCodeConfigRouteConfig, AddBarCodeConfigResponse } from "./addBarCodeConfig.types";

@Controller()
export class AddBarCodeConfigController extends BaseController<AddBarCodeConfigRouteConfig> {
  constructor(
    @inject("AddBarCodeConfigUseCase") private addBarCodeConfigUseCase: AddBarCodeConfigUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddBarCodeConfigRouteConfig>): Promise<void | APIResponse> {
    await this.addBarCodeConfigUseCase.execute(req.body);
    return new SuccessResponse<AddBarCodeConfigResponse>("global.success");
  }
}
