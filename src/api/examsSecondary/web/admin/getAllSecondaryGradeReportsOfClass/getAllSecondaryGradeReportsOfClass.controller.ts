import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAllSecondaryGradeReportsOfClassUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetAllSecondaryGradeReportsOfClass.usecase";
import {
  GetAllSecondaryGradeReportsOfClassRouteConfig,
  GetAllSecondaryGradeReportsOfClassResponse,
} from "./getAllSecondaryGradeReportsOfClass.types";

@Controller()
export class GetAllSecondaryGradeReportsOfClassController extends BaseController<GetAllSecondaryGradeReportsOfClassRouteConfig> {
  constructor(
    @inject("GetAllSecondaryGradeReportsOfClassUseCase")
    private getAllSecondaryGradeReportsOfClassUseCase: GetAllSecondaryGradeReportsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllSecondaryGradeReportsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getAllSecondaryGradeReportsOfClassUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetAllSecondaryGradeReportsOfClassResponse>(
      "global.success",
      result,
    );
  }
}
