import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateBarCodeConfigUseCase } from "../../../../../feature/barCode/useCases/UpdateBarCodeConfig.usecase";
import {
  UpdateBarCodeConfigRouteConfig,
  UpdateBarCodeConfigResponse,
} from "./updateBarCodeConfig.types";

@Controller()
export class UpdateBarCodeConfigController extends BaseController<UpdateBarCodeConfigRouteConfig> {
  constructor(
    @inject("UpdateBarCodeConfigUseCase")
    private updateBarCodeConfigUseCase: UpdateBarCodeConfigUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateBarCodeConfigRouteConfig>): Promise<void | APIResponse> {
    await this.updateBarCodeConfigUseCase.execute(req.params.barCodeNewId, req.body);
    return new SuccessResponse<UpdateBarCodeConfigResponse>("global.success");
  }
}
