import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListTutorialUseCase } from "../../../../../feature/tutorial/useCases/ListTutorial.usecase";
import { GetTutorialsResponse, GetTutorialsRouteConfig } from "./getTutorials.types";

@Controller()
export class GetTutorialsController extends BaseController<GetTutorialsRouteConfig> {
  constructor(@inject("ListTutorialUseCase") private listTutorialUseCase: ListTutorialUseCase) {
    super();
  }

  async main(req: TypedRequest<GetTutorialsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listTutorialUseCase.execute({
      search: req.query.interfaceKey,
      page: undefined,
      limit: undefined,
    });
    return new SuccessResponse<GetTutorialsResponse>("global.success", response.docs);
  }
}
