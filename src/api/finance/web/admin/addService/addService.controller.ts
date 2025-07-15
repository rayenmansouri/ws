import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddServiceUseCase,
  AddServiceUseCaseDto,
} from "../../../../../feature/finance/useCases/AddService.usecase";
import { AddServiceRouteConfig, AddServiceResponse } from "./addService.types";

@Controller()
export class AddServiceController extends BaseController<AddServiceRouteConfig> {
  constructor(@inject("AddServiceUseCase") private addServiceUseCase: AddServiceUseCase) {
    super();
  }

  async main(req: TypedRequest<AddServiceRouteConfig>): Promise<void | APIResponse> {
    const dto: AddServiceUseCaseDto = {
      ...req.body,
      description: req.body.description ?? null,
      amount: req.body.amount,
      showByDefault: req.body.showByDefault ?? false,
    };
    const response = await this.addServiceUseCase.execute(dto);
    return new SuccessResponse<AddServiceResponse>("global.success", response);
  }
}
