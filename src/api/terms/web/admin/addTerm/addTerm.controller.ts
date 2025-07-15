import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddTermUseCase } from "../../../../../feature/terms/usecases/AddTerm.usecase";
import { AddTermRouteConfig, AddTermResponse } from "./addTerm.types";

@Controller()
export class AddTermController extends BaseController<AddTermRouteConfig> {
  constructor(@inject("AddTermUseCase") private addTermUseCase: AddTermUseCase) {
    super();
  }

  async main(req: TypedRequest<AddTermRouteConfig>): Promise<void | APIResponse> {
    await this.addTermUseCase.execute(req.body);
    return new SuccessResponse<AddTermResponse>("global.success");
  }
}
