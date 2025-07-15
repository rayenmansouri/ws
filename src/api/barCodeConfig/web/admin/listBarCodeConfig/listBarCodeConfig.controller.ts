import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListBarCodeConfigUseCase } from "../../../../../feature/barCode/useCases/ListBarCodeConfig.usecase";
import { ListBarCodeConfigRouteConfig, ListBarCodeConfigResponse } from "./listBarCodeConfig.types";

@Controller()
export class ListBarCodeConfigController extends BaseController<ListBarCodeConfigRouteConfig> {
  constructor(
    @inject("ListBarCodeConfigUseCase") private listBarCodeConfigUseCase: ListBarCodeConfigUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListBarCodeConfigRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listBarCodeConfigUseCase.execute({
      name: req.query.name,
      limit: req.query.limit,
      page: req.query.page,
    });
    return new SuccessResponse<ListBarCodeConfigResponse>("global.success", response);
  }
}
