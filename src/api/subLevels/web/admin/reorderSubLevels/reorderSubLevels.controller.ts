import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderSubLevelsUseCase } from "../../../../../feature/subLevels/useCases/ReorderSubLevels.usecase";
import { ReorderSubLevelsRouteConfig, ReorderSubLevelsResponse } from "./reorderSubLevels.types";

@Controller()
export class ReorderSubLevelsController extends BaseController<ReorderSubLevelsRouteConfig> {
  constructor(
    @inject("ReorderSubLevelsUseCase")
    private readonly reorderSubLevelsUseCase: ReorderSubLevelsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ReorderSubLevelsRouteConfig>): Promise<void | APIResponse> {
    await this.reorderSubLevelsUseCase.execute(req.params.subLevelNewId, req.body.newRank);
    return new SuccessResponse<ReorderSubLevelsResponse>("global.success");
  }
}
