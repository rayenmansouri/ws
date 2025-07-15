import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSubLevelUseCase } from "../../../../../feature/subLevels/useCases/AddSubLevel.usecase";
import { AddSubLevelRouteConfig, AddSubLevelResponse } from "./addSubLevel.types";

@Controller()
export class AddSubLevelController extends BaseController<AddSubLevelRouteConfig> {
  constructor(@inject("AddSubLevelUseCase") private addSubLevelUseCase: AddSubLevelUseCase) {
    super();
  }

  async main(req: TypedRequest<AddSubLevelRouteConfig>): Promise<void | APIResponse> {
    await this.addSubLevelUseCase.execute(req.body);
    return new SuccessResponse<AddSubLevelResponse>("subLevel.createdSuccessfully");
  }
}
