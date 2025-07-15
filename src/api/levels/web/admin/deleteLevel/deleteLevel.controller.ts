import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteLevelUseCase } from "../../../../../feature/levels/useCases/DeleteLevel.usecase";
import { DeleteLevelResponse, DeleteLevelRouteConfig } from "./deleteLevel.types";

@Controller()
export class DeleteLevelController extends BaseController<DeleteLevelRouteConfig> {
  constructor(@inject("DeleteLevelUseCase") private deleteLevelUseCase: DeleteLevelUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteLevelRouteConfig>): Promise<void | APIResponse> {
    await this.deleteLevelUseCase.execute(req.params.levelNewId);
    return new SuccessResponse<DeleteLevelResponse>("level.deletedSuccessfully");
  }
}
