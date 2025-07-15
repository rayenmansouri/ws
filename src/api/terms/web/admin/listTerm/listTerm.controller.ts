import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListTermUseCase } from "../../../../../feature/terms/usecases/ListTerm.usecase";
import { ListTermRouteConfig, ListTermResponse } from "./listTerm.types";

@Controller()
export class ListTermController extends BaseController<ListTermRouteConfig> {
  constructor(@inject("ListTermUseCase") private listTermUseCase: ListTermUseCase) {
    super();
  }

  async main(req: TypedRequest<ListTermRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listTermUseCase.execute({ ...req.query, name: req.query.search });
    return new SuccessResponse<ListTermResponse>("global.success", response);
  }
}
