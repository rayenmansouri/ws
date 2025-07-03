import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAllIBGradeReportsOfClassUseCase } from "../../../../../feature/examGrade/useCases/ib/GetAllIBGradeReportsOfClass.usecase";
import {
  GetAllIBGradeReportsOfClassRouteConfig,
  GetAllIBGradeReportsOfClassResponse,
} from "./getAllIBGradeReportsOfClass.types";

@Controller()
export class GetAllIBGradeReportsOfClassController extends BaseController<GetAllIBGradeReportsOfClassRouteConfig> {
  constructor(
    @inject("GetAllIBGradeReportsOfClassUseCase")
    private getAllIBGradeReportsOfClassUseCase: GetAllIBGradeReportsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllIBGradeReportsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getAllIBGradeReportsOfClassUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetAllIBGradeReportsOfClassResponse>("global.success", response);
  }
}
