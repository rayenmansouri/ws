import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateTutorialUseCase } from "../../../../../feature/tutorial/useCases/UpdateTutorial.usecase";
import { UpdateTutorialRouteConfig, UpdateTutorialResponse } from "./updateTutorial.types";

@Controller()
export class UpdateTutorialController extends BaseController<UpdateTutorialRouteConfig> {
  constructor(
    @inject("UpdateTutorialUseCase") private updateTutorialUseCase: UpdateTutorialUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateTutorialRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateTutorialUseCase.execute({
      ...req.body,
      tutorialNewId: req.params.tutorialNewId,
    });
    return new SuccessResponse<UpdateTutorialResponse>("global.success", response);
  }
}
