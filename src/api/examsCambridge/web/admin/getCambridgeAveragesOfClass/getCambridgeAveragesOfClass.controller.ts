import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetCambridgeAveragesOfClassUsecase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeAveragesOfClass.usecase";
import {
  GetCambridgeAveragesOfClassRouteConfig,
  GetCambridgeAveragesOfClassResponse,
} from "./getCambridgeAveragesOfClass.types";

@Controller()
export class GetCambridgeAveragesOfClassController extends BaseController<GetCambridgeAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetCambridgeAveragesOfClassUsecase")
    private getCambridgeAveragesOfClassUsecase: GetCambridgeAveragesOfClassUsecase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetCambridgeAveragesOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getCambridgeAveragesOfClassUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetCambridgeAveragesOfClassResponse>("global.success", result);
  }
}
