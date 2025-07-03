import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListTutorialUseCase } from "../../../../../feature/tutorial/useCases/ListTutorial.usecase";
import { ListTutorialsRouteConfig, ListTutorialsResponse } from "./listTutorials.types";

@Controller()
export class ListTutorialsController extends BaseController<ListTutorialsRouteConfig> {
  constructor(@inject("ListTutorialUseCase") private listTutorialUseCase: ListTutorialUseCase) {
    super();
  }

  async main(req: TypedRequest<ListTutorialsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listTutorialUseCase.execute({
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
    });
    return new SuccessResponse<ListTutorialsResponse>("global.success", response);
  }
}
