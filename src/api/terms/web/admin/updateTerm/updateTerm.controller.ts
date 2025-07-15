import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateTermUseCase } from "../../../../../feature/terms/usecases/UpdateTerm.usecase";
import { UpdateTermRouteConfig, UpdateTermResponse } from "./updateTerm.types";

@Controller()
export class UpdateTermController extends BaseController<UpdateTermRouteConfig> {
  constructor(@inject("UpdateTermUseCase") private updateTermUseCase: UpdateTermUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateTermRouteConfig>): Promise<void | APIResponse> {
    await this.updateTermUseCase.execute(req.params.termNewId, req.body);
    return new SuccessResponse<UpdateTermResponse>("global.success");
  }
}
