import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSessionTypeUseCase } from "../../../../../feature/sessionTypes/usecases/AddSessionType.usecase";
import { AddSessionTypeRouteConfig, AddSessionTypeResponse } from "./addSessionType.types";

@Controller()
export class AddSessionTypeController extends BaseController<AddSessionTypeRouteConfig> {
  constructor(
    @inject("AddSessionTypeUseCase") private addSessionTypeUseCase: AddSessionTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSessionTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addSessionTypeUseCase.execute(req.body);
    return new SuccessResponse<AddSessionTypeResponse>("global.success");
  }
}
