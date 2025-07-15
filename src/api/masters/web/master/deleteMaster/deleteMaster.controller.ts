import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteMasterUseCase } from "../../../../../feature/masters/useCases/DeleteMaster.usecase";
import { DeleteMasterRouteConfig, DeleteMasterResponse } from "./deleteMaster.types";

@Controller()
export class DeleteMasterController extends BaseController<DeleteMasterRouteConfig> {
  constructor(@inject("DeleteMasterUseCase") private deleteMasterUseCase: DeleteMasterUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteMasterRouteConfig>): Promise<void | APIResponse> {
    await this.deleteMasterUseCase.execute(req.params.masterNewId);

    return new SuccessResponse<DeleteMasterResponse>("master.deletedSuccessfully");
  }
}
