import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteBarCodeConfigUseCase } from "../../../../../feature/barCode/useCases/DeleteBarCodeConfig.usecase";
import {
  DeleteBarCodeConfigRouteConfig,
  DeleteBarCodeConfigResponse,
} from "./deleteBarCodeConfig.types";

@Controller()
export class DeleteBarCodeConfigController extends BaseController<DeleteBarCodeConfigRouteConfig> {
  constructor(
    @inject("DeleteBarCodeConfigUseCase")
    private deleteBarCodeConfigUseCase: DeleteBarCodeConfigUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteBarCodeConfigRouteConfig>): Promise<void | APIResponse> {
    await this.deleteBarCodeConfigUseCase.execute(req.params.barCodeNewId);
    return new SuccessResponse<DeleteBarCodeConfigResponse>("global.success");
  }
}
