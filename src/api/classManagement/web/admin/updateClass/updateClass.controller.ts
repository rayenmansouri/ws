import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateClassUseCase } from "../../../../../feature/classes/useCases/UpdateClass.usecase";
import { UpdateClassRouteConfig, UpdateClassResponse } from "./updateClass.types";

@Controller()
export class UpdateClassController extends BaseController<UpdateClassRouteConfig> {
  constructor(@inject("UpdateClassUseCase") private updateClassUseCase: UpdateClassUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateClassRouteConfig>): Promise<void | APIResponse> {
    await this.updateClassUseCase.execute(req.params.classNewId, req.body.name);
    return new SuccessResponse<UpdateClassResponse>("class.updateSuccessfully");
  }
}
