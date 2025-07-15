import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { PublishTermUseCase } from "../../../../../feature/examGrade/useCases/PublishTerm.usecase";
import { PublishTermRouteConfig, PublishTermResponse } from "./publishTerm.types";

@Controller()
export class PublishTermController extends BaseController<PublishTermRouteConfig> {
  constructor(
    @inject("PublishTermUseCase")
    private readonly publishTermUseCase: PublishTermUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<PublishTermRouteConfig>): Promise<void | APIResponse> {
    await this.publishTermUseCase.execute(req.params.classNewId, req.params.termId);

    return new SuccessResponse<PublishTermResponse>("global.success");
  }
}
