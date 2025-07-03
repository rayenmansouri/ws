import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddMasterUseCase } from "../../../../../feature/masters/useCases/AddMaster.usecase";
import { AddMasterRouteConfig, AddMasterResponse } from "./addMaster.types";

@Controller()
export class AddMasterController extends BaseController<AddMasterRouteConfig> {
  constructor(@inject("AddMasterUseCase") private addMasterUseCase: AddMasterUseCase) {
    super();
  }

  async main(req: TypedRequest<AddMasterRouteConfig>): Promise<void | APIResponse> {
    await this.addMasterUseCase.execute(req.body);

    return new SuccessResponse<AddMasterResponse>("master.addedSuccessfully");
  }
}
