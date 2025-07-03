import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddLevelUseCase } from "../../../../../feature/levels/useCases/AddLevel.usecase";
import { AddLevelRouteConfig, AddLevelResponse } from "./addLevel.types";

@Controller()
export class AddLevelController extends BaseController<AddLevelRouteConfig> {
  constructor(@inject("AddLevelUseCase") private addLevelUseCase: AddLevelUseCase) {
    super();
  }

  async main(req: TypedRequest<AddLevelRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addLevelUseCase.execute(req.body);
    return new SuccessResponse<AddLevelResponse>("level.createdSuccessfully", response);
  }
}
