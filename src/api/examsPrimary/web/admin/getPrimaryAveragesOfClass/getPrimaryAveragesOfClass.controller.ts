import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetPrimaryAveragesOfClassUsecase } from "../../../../../feature/examGrade/useCases/primary/GetPrimaryAveragesOfClass.usecase";
import {
  GetPrimaryAveragesOfClassRouteConfig,
  GetPrimaryAveragesOfClassResponse,
} from "./getPrimaryAveragesOfClass.types";

@Controller()
export class GetPrimaryAveragesOfClassController extends BaseController<GetPrimaryAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetPrimaryAveragesOfClassUsecase")
    private getPrimaryAveragesOfClassUsecase: GetPrimaryAveragesOfClassUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetPrimaryAveragesOfClassRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getPrimaryAveragesOfClassUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetPrimaryAveragesOfClassResponse>("global.success", result);
  }
}
