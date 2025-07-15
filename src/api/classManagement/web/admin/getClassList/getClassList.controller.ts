import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetClassListUseCase } from "../../../../../feature/classes/useCases/GetClassList.usecase";
import { GetClassListRouteConfig, GetClassListResponse } from "./getClassList.types";

@Controller()
export class GetClassListController extends BaseController<GetClassListRouteConfig> {
  constructor(
    @inject("GetClassListUseCase")
    private getClassListUseCase: GetClassListUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetClassListRouteConfig>): Promise<void | APIResponse> {
    const { subLevelNewId } = req.params;
    const { classTypeNewId, schoolYearId } = req.query;
    const response = await this.getClassListUseCase.execute({
      subLevelNewId,
      classTypeNewId,
      schoolYearId,
    });
    return new SuccessResponse<GetClassListResponse>("global.success", response);
  }
}
