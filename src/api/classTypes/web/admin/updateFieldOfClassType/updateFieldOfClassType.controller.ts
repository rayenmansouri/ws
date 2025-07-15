import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateFieldOfClassTypeUseCase } from "../../../../../feature/classTypes/useCases/UpdateFieldOfClassType.usecase";
import {
  UpdateFieldOfClassTypeRouteConfig,
  UpdateFieldOfClassTypeResponse,
} from "./updateFieldOfClassType.types";

@Controller()
export class UpdateFieldOfClassTypeController extends BaseController<UpdateFieldOfClassTypeRouteConfig> {
  constructor(
    @inject("UpdateFieldOfClassTypeUseCase")
    private updateFieldOfClassTypeUseCase: UpdateFieldOfClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateFieldOfClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateFieldOfClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.fieldRank,
      req.body,
    );
    return new SuccessResponse<UpdateFieldOfClassTypeResponse>("global.success");
  }
}
