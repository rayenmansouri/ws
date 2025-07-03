import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBAveragesOfClassUsecase } from "../../../../../feature/examGrade/useCases/ib/GetIBAveragesOfClass.usecase";
import {
  GetIBAveragesOfClassRouteConfig,
  GetIBAveragesOfClassResponse,
} from "./getIBAveragesOfClass.types";

@Controller()
export class GetIBAveragesOfClassController extends BaseController<GetIBAveragesOfClassRouteConfig> {
  constructor(
    @inject("GetIBAveragesOfClassUsecase")
    private getIBAveragesOfClassUsecase: GetIBAveragesOfClassUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBAveragesOfClassRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getIBAveragesOfClassUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetIBAveragesOfClassResponse>("global.success", response);
  }
}
