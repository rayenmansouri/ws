import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateAppVersionUseCase } from "../../../../../feature/masters/useCases/updateOsVersion.usecase";
import { UpdateAppVersionResponse, UpdateAppVersionRouteConfig } from "./updateAppVersion.types";

@Controller()
export class UpdateAppVersionController extends BaseController<UpdateAppVersionRouteConfig> {
  constructor(
    @inject("UpdateAppVersionUseCase")
    private readonly updateAppVersionUseCase: UpdateAppVersionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateAppVersionRouteConfig>): Promise<void | APIResponse> {
    await this.updateAppVersionUseCase.execute(req.body);

    return new SuccessResponse<UpdateAppVersionResponse>("global.success");
  }
}
