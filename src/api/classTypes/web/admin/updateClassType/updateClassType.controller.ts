import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateClassTypeUseCase } from "../../../../../feature/classTypes/useCases/updateClassTypes.usecase";
import { UpdateClassTypeRouteConfig, UpdateClassTypeResponse } from "./updateClassType.types";

@Controller()
export class UpdateClassTypeController extends BaseController<UpdateClassTypeRouteConfig> {
  constructor(
    @inject("UpdateClassTypeUseCase") private updateClassTypeUseCase: UpdateClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateClassTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateClassTypeUseCase.execute(req.params.classTypeNewId, {
      ...req.body,
      nextClassTypeNewIds: req.body.nextClassTypeNewIds || [],
    });
    return new SuccessResponse<UpdateClassTypeResponse>("classType.updateSuccessfully", response);
  }
}
