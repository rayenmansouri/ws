import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSignaturesUseCase } from "../../../../../feature/signatures/useCases/ListSignatures.usecase";
import { ListSignaturesRouteConfig, ListSignaturesResponse } from "./listSignatures.types";

@Controller()
export class ListSignaturesController extends BaseController<ListSignaturesRouteConfig> {
  constructor(
    @inject("ListSignaturesUseCase") private listSignaturesUseCase: ListSignaturesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSignaturesRouteConfig>): Promise<void | APIResponse> {
    const signatures = await this.listSignaturesUseCase.execute(
      { search: req.query.search },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListSignaturesResponse>("global.success", signatures);
  }
}
