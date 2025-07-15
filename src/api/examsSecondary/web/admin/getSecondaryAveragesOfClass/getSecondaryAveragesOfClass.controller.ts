import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondaryAveragesOfClassUsecase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryAveragesOfClass.usecase";
import {
  GetSecondaryAveragesOfClassRouteConfig,
  GetSecondaryAveragesOfClassResponse,
} from "./getSecondaryAveragesOfClass.types";

@Controller()
export class GetSecondaryAveragesOfClassController extends BaseController<GetSecondaryAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetSecondaryAveragesOfClassUsecase")
    private getSecondaryAveragesOfClassUsecase: GetSecondaryAveragesOfClassUsecase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSecondaryAveragesOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getSecondaryAveragesOfClassUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetSecondaryAveragesOfClassResponse>("global.success", result);
  }
}
