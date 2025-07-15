import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IncompleteTermRouteConfig, IncompleteTermResponse } from "./incompleteTerm.types";
import { IncompleteTermUseCase } from "../../../../../feature/examGrade/useCases/IncompleteTerm.usecase";

@Controller()
export class IncompleteTermController extends BaseController<IncompleteTermRouteConfig> {
  constructor(
    @inject("IncompleteTermUseCase")
    private incompleteTermUseCase: IncompleteTermUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<IncompleteTermRouteConfig>): Promise<void | APIResponse> {
    await this.incompleteTermUseCase.execute(req.params.termNewId, req.params.classNewId);

    return new SuccessResponse<IncompleteTermResponse>("global.success");
  }
}
