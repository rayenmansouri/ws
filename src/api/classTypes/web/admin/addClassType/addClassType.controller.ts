import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddClassTypeUseCase } from "../../../../../feature/classTypes/useCases/addClassTypes.usecase";
import { AddClassTypeRouteConfig, AddClassTypeResponse } from "./addClassType.types";

@Controller()
export class AddClassTypeController extends BaseController<AddClassTypeRouteConfig> {
  constructor(@inject("AddClassTypeUseCase") private addClassTypeUseCase: AddClassTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<AddClassTypeRouteConfig>): Promise<void | APIResponse> {
    const newClassType = await this.addClassTypeUseCase.execute({
      ...req.body,
      nextClassTypeNewIds: req.body.nextClassTypeNewIds || null,
    });
    return new SuccessResponse<AddClassTypeResponse>("classType.createdSuccessfully", newClassType);
  }
}
