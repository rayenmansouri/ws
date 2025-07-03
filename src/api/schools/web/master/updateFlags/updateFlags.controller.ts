import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateFlagsRouteConfig, UpdateFlagsResponse } from "./updateFlags.types";
import { UpdateFlagsUseCase } from "../../../../../feature/schools/useCases/UpdateFlags.usecase";
import { inject } from "../../../../../core/container/TypedContainer";
import { TFeatureFlagsEnum } from "../../../../../feature/schools/constants/featureFlags";

@Controller()
export class UpdateFlagsController extends BaseController<UpdateFlagsRouteConfig> {
  constructor(
    @inject("UpdateFlagsUseCase")
    private updateFlagsUseCase: UpdateFlagsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateFlagsRouteConfig>): Promise<void | APIResponse> {
    await this.updateFlagsUseCase.execute(
      req.params.schoolNewId,
      req.body.flags as Record<TFeatureFlagsEnum, boolean>,
    );
    return new SuccessResponse<UpdateFlagsResponse>("global.success");
  }
}
