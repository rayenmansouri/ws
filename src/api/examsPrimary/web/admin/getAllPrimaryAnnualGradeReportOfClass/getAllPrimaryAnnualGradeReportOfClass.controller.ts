import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetAllPrimaryAnnualGradeReportOfClassRouteConfig,
  GetAllPrimaryAnnualGradeReportOfClassResponse,
} from "./getAllPrimaryAnnualGradeReportOfClass.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetAllPrimaryAnnualGradeReportOfClassUsecase } from "../../../../../feature/examGrade/useCases/primary/GetAllPrimaryAnnualGradeReportOfClass.usecase";

@Controller()
export class GetAllPrimaryAnnualGradeReportOfClassController extends BaseController<GetAllPrimaryAnnualGradeReportOfClassRouteConfig> {
  constructor(
    @inject("GetAllPrimaryAnnualGradeReportOfClassUsecase")
    private getAllPrimaryAnnualGradeReportOfClassUsecase: GetAllPrimaryAnnualGradeReportOfClassUsecase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAllPrimaryAnnualGradeReportOfClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const { classNewId } = req.params;
    const result = await this.getAllPrimaryAnnualGradeReportOfClassUsecase.execute(classNewId);

    return new SuccessResponse<GetAllPrimaryAnnualGradeReportOfClassResponse>(
      "global.success",
      result,
    );
  }
}
