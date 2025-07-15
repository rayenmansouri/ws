import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteServiceUseCase } from "../../../../../feature/finance/useCases/DeleteService.usecase";
import { DeleteServiceRouteConfig, DeleteServiceResponse } from "./deleteService.types";

@Controller()
export class DeleteServiceController extends BaseController<DeleteServiceRouteConfig> {
  constructor(@inject("DeleteServiceUseCase") private deleteServiceUseCase: DeleteServiceUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteServiceRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteServiceUseCase.execute({ serviceIds: req.body.ids });
    return new SuccessResponse<DeleteServiceResponse>("global.success", response);
  }
}
