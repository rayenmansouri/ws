import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAppVersionUseCase } from "../../../../../feature/masters/useCases/getAllAppsVersion.usecase";
import { GetAppVersionResponse, GetAppVersionRouteConfig } from "./getAppVersion.types";

@Controller()
export class GetAppVersionController extends BaseController<GetAppVersionRouteConfig> {
  constructor(
    @inject("GetAllAppsVersionUseCase") private getAllAppsVersionUseCase: GetAppVersionUseCase,
  ) {
    super();
  }

  async main(_: TypedRequest<GetAppVersionRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getAllAppsVersionUseCase.execute();
    return new SuccessResponse<GetAppVersionResponse>("global.success", response);
  }
}
