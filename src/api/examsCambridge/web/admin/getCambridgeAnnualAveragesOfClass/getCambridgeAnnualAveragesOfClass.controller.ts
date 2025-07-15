import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetCambridgeAnnualAveragesOfClassUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeAnnualAveragesOfClass.usecase";
import {
  GetCambridgeAnnualAveragesOfClassResponse,
  GetCambridgeAnnualAveragesOfClassRouteConfig,
} from "./getCambridgeAnnualAveragesOfClass.types";

@Controller()
export class GetCambridgeAnnualAveragesOfClassController extends BaseController<GetCambridgeAnnualAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetCambridgeAnnualAveragesOfClassUseCase")
    private getCambridgeAnnualAveragesOfClassUseCase: GetCambridgeAnnualAveragesOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetCambridgeAnnualAveragesOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getCambridgeAnnualAveragesOfClassUseCase.execute(
      req.params.classNewId,
    );

    return new SuccessResponse<GetCambridgeAnnualAveragesOfClassResponse>("global.success", result);
  }
}
