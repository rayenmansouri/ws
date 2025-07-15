import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddTutorialUseCase } from "../../../../../feature/tutorial/useCases/AddTutorial.usecase";
import { AddTutorialResponse, AddTutorialRouteConfig } from "./addTutorial.types";

@Controller()
export class AddTutorialController extends BaseController<AddTutorialRouteConfig> {
  constructor(@inject("AddTutorialUseCase") private addTutorialUseCase: AddTutorialUseCase) {
    super();
  }

  async main(req: TypedRequest<AddTutorialRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addTutorialUseCase.execute(req.body);
    return new SuccessResponse<AddTutorialResponse>("global.success", response);
  }
}
