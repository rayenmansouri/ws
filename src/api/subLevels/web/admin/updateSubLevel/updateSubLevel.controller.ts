import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSubLevelUseCase } from "../../../../../feature/subLevels/useCases/UpdateSubLevel.usecase";
import { UpdateSubLevelRouteConfig, UpdateSubLevelResponse } from "./updateSubLevel.types";

@Controller()
export class UpdateSubLevelController extends BaseController<UpdateSubLevelRouteConfig> {
  constructor(
    @inject("UpdateSubLevelUseCase") private updateSubLevelUseCase: UpdateSubLevelUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSubLevelRouteConfig>): Promise<void | APIResponse> {
    await this.updateSubLevelUseCase.execute(req.params.subLevelNewId, req.body);
    return new SuccessResponse<UpdateSubLevelResponse>("subLevel.updatedSuccessfully");
  }
}
