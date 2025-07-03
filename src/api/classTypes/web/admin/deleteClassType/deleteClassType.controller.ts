import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteClassTypeUseCase } from "../../../../../feature/classTypes/useCases/DeleteClassType.usecase";
import { DeleteClassTypeRouteConfig, DeleteClassTypeResponse } from "./deleteClassType.types";

@Controller()
export class DeleteClassTypeController extends BaseController<DeleteClassTypeRouteConfig> {
  constructor(
    @inject("DeleteClassTypeUseCase") private deleteClassTypeUseCase: DeleteClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteClassTypeUseCase.execute(req.params.classTypeNewId);
    return new SuccessResponse<DeleteClassTypeResponse>("global.success");
  }
}
