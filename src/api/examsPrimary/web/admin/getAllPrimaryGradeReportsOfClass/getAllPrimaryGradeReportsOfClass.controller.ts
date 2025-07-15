import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAllPrimaryGradeReportsOfClassUseCase } from "../../../../../feature/examGrade/useCases/primary/GetAllPrimaryGradeReportsOfClass.usecase";
import {
  GetAllPrimaryGradeReportsOfClassRouteConfig,
  GetAllPrimaryGradeReportsOfClassResponse,
} from "./getAllPrimaryGradeReportsOfClass.types";

@Controller()
export class GetAllPrimaryGradeReportsOfClassController extends BaseController<GetAllPrimaryGradeReportsOfClassRouteConfig> {
  constructor(
    @inject("GetAllPrimaryGradeReportsOfClassUseCase")
    private getAllPrimaryGradeReportsOfClassUseCase: GetAllPrimaryGradeReportsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllPrimaryGradeReportsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getAllPrimaryGradeReportsOfClassUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
      req.query.templateIds,
    );

    return new SuccessResponse<GetAllPrimaryGradeReportsOfClassResponse>("global.success", result);
  }
}
