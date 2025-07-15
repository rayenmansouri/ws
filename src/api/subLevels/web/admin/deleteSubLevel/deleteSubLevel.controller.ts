import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSubLevelUseCase } from "../../../../../feature/subLevels/useCases/DeleteSubLevel.usecase";
import { DeleteSubLevelRouteConfig, DeleteSubLevelResponse } from "./deleteSubLevel.types";

@Controller()
export class DeleteSubLevelController extends BaseController<DeleteSubLevelRouteConfig> {
  constructor(
    @inject("DeleteSubLevelUseCase") private deleteSubLevelUseCase: DeleteSubLevelUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSubLevelRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSubLevelUseCase.execute(req.params.subLevelNewId);
    return new SuccessResponse<DeleteSubLevelResponse>("subLevel.deletedSuccessfully");
  }
}
