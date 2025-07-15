import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateLevelUseCase } from "../../../../../feature/levels/useCases/UpdateLevel.usecase";
import { UpdateLevelResponse, UpdateLevelRouteConfig } from "./updateLevel.types";

@Controller()
export class UpdateLevelController extends BaseController<UpdateLevelRouteConfig> {
  constructor(@inject("UpdateLevelUseCase") private updateLevelUseCase: UpdateLevelUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateLevelRouteConfig>): Promise<void | APIResponse> {
    await this.updateLevelUseCase.execute(req.params.levelNewId, req.body);

    return new SuccessResponse<UpdateLevelResponse>("level.updatedSuccessfully");
  }
}
