import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteTutorialUseCase } from "../../../../../feature/tutorial/useCases/DeleteTutorial.usecase";
import { DeleteTutorialResponse, DeleteTutorialRouteConfig } from "./deleteTutorial.types";

@Controller()
export class DeleteTutorialController extends BaseController<DeleteTutorialRouteConfig> {
  constructor(
    @inject("DeleteTutorialUseCase") private deleteTutorialUseCase: DeleteTutorialUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteTutorialRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteTutorialUseCase.execute(req.params);
    return new SuccessResponse<DeleteTutorialResponse>("global.success", response);
  }
}
