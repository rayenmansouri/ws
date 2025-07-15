import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderLevelsUseCase } from "../../../../../feature/levels/useCases/ReorderLevels.usecase";
import { ReorderLevelsRouteConfig, ReorderLevelsResponse } from "./reorderLevels.types";

@Controller()
export class ReorderLevelsController extends BaseController<ReorderLevelsRouteConfig> {
  constructor(@inject("ReorderLevelsUseCase") private reorderLevelsUseCase: ReorderLevelsUseCase) {
    super();
  }

  async main(req: TypedRequest<ReorderLevelsRouteConfig>): Promise<void | APIResponse> {
    await this.reorderLevelsUseCase.execute(req.params.levelNewId, req.body.newRank);
    return new SuccessResponse<ReorderLevelsResponse>("global.success");
  }
}
