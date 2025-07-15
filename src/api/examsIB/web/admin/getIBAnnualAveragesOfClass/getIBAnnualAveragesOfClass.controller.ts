import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBAnnualAveragesOfClassUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBAnnualAveragesOfClass.usecase";
import {
  GetIBAnnualAveragesOfClassRouteConfig,
  GetIBAnnualAveragesOfClassResponse,
} from "./getIBAnnualAveragesOfClass.types";

@Controller()
export class GetIBAnnualAveragesOfClassController extends BaseController<GetIBAnnualAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetIBAnnualAveragesOfClassUseCase")
    private getIBAnnualAveragesOfClassUseCase: GetIBAnnualAveragesOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetIBAnnualAveragesOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getIBAnnualAveragesOfClassUseCase.execute(req.params.classNewId);

    return new SuccessResponse<GetIBAnnualAveragesOfClassResponse>("global.success", result);
  }
}
