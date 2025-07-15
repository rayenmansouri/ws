import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateServiceUseCase } from "../../../../../feature/finance/useCases/UpdateService.usecase";
import { UpdateServiceRouteConfig, UpdateServiceResponse } from "./updateService.types";

@Controller()
export class UpdateServiceController extends BaseController<UpdateServiceRouteConfig> {
  constructor(@inject("UpdateServiceUseCase") private updateServiceUseCase: UpdateServiceUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateServiceRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateServiceUseCase.execute({
      ...req.body,
      serviceId: req.params.serviceId,
    });
    return new SuccessResponse<UpdateServiceResponse>("global.success", response);
  }
}
