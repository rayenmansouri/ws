import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteAlertUseCase } from "../../../../../feature/alertManagement/useCases/DeleteAlert.usecase";
import { DeleteAlertRouteConfig, DeleteAlertResponse } from "./deleteAlert.types";

@Controller()
export class DeleteAlertController extends BaseController<DeleteAlertRouteConfig> {
  constructor(@inject("DeleteAlertUseCase") private deleteAlertUseCase: DeleteAlertUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteAlertRouteConfig>): Promise<void | APIResponse> {
    await this.deleteAlertUseCase.execute(req.params.alertNewId);
    return new SuccessResponse<DeleteAlertResponse>("global.success");
  }
}
