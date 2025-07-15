import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAllCambridgeGradeReportsOfClassUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetAllCambridgeGradeReportsOfClass.usecase";
import {
  GetAllCambridgeGradeReportsOfClassRouteConfig,
  GetAllCambridgeGradeReportsOfClassResponse,
} from "./getAllCambridgeGradeReportsOfClass.types";

@Controller()
export class GetAllCambridgeGradeReportsOfClassController extends BaseController<GetAllCambridgeGradeReportsOfClassRouteConfig> {
  constructor(
    @inject("GetAllCambridgeGradeReportsOfClassUseCase")
    private getAllCambridgeGradeReportsOfClassUseCase: GetAllCambridgeGradeReportsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllCambridgeGradeReportsOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getAllCambridgeGradeReportsOfClassUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetAllCambridgeGradeReportsOfClassResponse>(
      "global.success",
      result,
    );
  }
}
