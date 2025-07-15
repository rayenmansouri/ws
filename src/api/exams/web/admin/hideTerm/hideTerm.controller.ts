import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { HideTermRouteConfig, HideTermResponse } from "./hideTerm.types";
import { HideTermUseCase } from "../../../../../feature/examGrade/useCases/HideTerm.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class HideTermController extends BaseController<HideTermRouteConfig> {
  constructor(
    @inject("HideTermUseCase")
    private readonly hideTermUseCase: HideTermUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<HideTermRouteConfig>): Promise<void | APIResponse> {
    await this.hideTermUseCase.execute(req.params.classNewId, req.params.termId);

    return new SuccessResponse<HideTermResponse>("global.success");
  }
}
