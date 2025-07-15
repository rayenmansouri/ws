import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAllCambridgeAnnualGradeReportsOfClassUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetAllCambridgeAnnualGradeReportsOfClass.usecase";
import {
  GetAllCambridgeAnnualGradeReportsRouteConfig,
  GetAllCambridgeAnnualGradeReportsResponse,
} from "./getAllCambridgeAnnualGradeReports.types";

@Controller()
export class GetAllCambridgeAnnualGradeReportsController extends BaseController<GetAllCambridgeAnnualGradeReportsRouteConfig> {
  constructor(
    @inject("GetAllCambridgeAnnualGradeReportsOfClassUseCase")
    private getAllCambridgeAnnualGradeReportsOfClassUseCase: GetAllCambridgeAnnualGradeReportsOfClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllCambridgeAnnualGradeReportsRouteConfig>,
  ): Promise<void | APIResponse> {
    const annualGradeReports = await this.getAllCambridgeAnnualGradeReportsOfClassUseCase.execute(
      req.params.classNewId,
    );

    return new SuccessResponse<GetAllCambridgeAnnualGradeReportsResponse>(
      "global.success",
      annualGradeReports,
    );
  }
}
