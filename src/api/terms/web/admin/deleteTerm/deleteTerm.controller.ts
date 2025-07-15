import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteTermUseCase } from "../../../../../feature/terms/usecases/DeleteTerm.usecase";
import { DeleteTermRouteConfig, DeleteTermResponse } from "./deleteTerm.types";

@Controller()
export class DeleteTermController extends BaseController<DeleteTermRouteConfig> {
  constructor(@inject("DeleteTermUseCase") private deleteTermUseCase: DeleteTermUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteTermRouteConfig>): Promise<void | APIResponse> {
    await this.deleteTermUseCase.execute(req.params.termNewId);
    return new SuccessResponse<DeleteTermResponse>("global.success");
  }
}
