import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteClassUseCase } from "../../../../../feature/classes/useCases/DeleteClass.usecase";
import { DeleteClassRouteConfig, DeleteClassResponse } from "./deleteClass.types";

@Controller()
export class DeleteClassController extends BaseController<DeleteClassRouteConfig> {
  constructor(@inject("DeleteClassUseCase") private deleteClassUseCase: DeleteClassUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteClassRouteConfig>): Promise<void | APIResponse> {
    await this.deleteClassUseCase.execute(req.params.classNewId);
    return new SuccessResponse<DeleteClassResponse>("class.deletedSuccessfully");
  }
}
