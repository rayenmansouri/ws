import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateMasterUseCase } from "../../../../../feature/masters/useCases/UpdateMaster.usecase";
import { UpdateMasterRouteConfig, UpdateMasterResponse } from "./updateMaster.types";

@Controller()
export class UpdateMasterController extends BaseController<UpdateMasterRouteConfig> {
  constructor(@inject("UpdateMasterUseCase") private updateMasterUseCase: UpdateMasterUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateMasterRouteConfig>): Promise<void | APIResponse> {
    await this.updateMasterUseCase.execute(req.params.masterNewId, req.body);

    return new SuccessResponse<UpdateMasterResponse>("master.updatedSuccessfully");
  }
}
