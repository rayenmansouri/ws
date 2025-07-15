import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CompleteTermUseCase } from "../../../../../feature/examGrade/useCases/CompleteTerm.usecase";
import { CompleteTermRouteConfig, CompleteTermResponse } from "./completeTerm.types";

@Controller()
export class CompleteTermController extends BaseController<CompleteTermRouteConfig> {
  constructor(
    @inject("CompleteTermUseCase")
    private completeTermUseCase: CompleteTermUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<CompleteTermRouteConfig>): Promise<void | APIResponse> {
    await this.completeTermUseCase.execute(req.params.classNewId, req.params.termNewId);

    return new SuccessResponse<CompleteTermResponse>("global.success");
  }
}
