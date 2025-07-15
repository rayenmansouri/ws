import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAnnualAveragesOfClassUseCase } from "../../../../../feature/examGrade/useCases/GetAnnualAveragesOfClass.usecase";
import {
  GetAnnualAveragesOfClassRouteConfig,
  GetAnnualAveragesOfClassResponse,
} from "./getAnnualAveragesOfClass.types";

@Controller()
export class GetAnnualAveragesOfClassController extends BaseController<GetAnnualAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetAnnualAveragesOfClassUseCase")
    private getAnnualAveragesOfClassUseCase: GetAnnualAveragesOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAnnualAveragesOfClassRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getAnnualAveragesOfClassUseCase.execute(req.params.classNewId);

    return new SuccessResponse<GetAnnualAveragesOfClassResponse>("global.success", result);
  }
}
