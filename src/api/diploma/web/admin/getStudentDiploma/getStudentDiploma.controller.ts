import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetStudentDiplomaUseCase,
  getStudentDiplomaRequestDto,
} from "../../../../../feature/examGrade/useCases/GetStudentDiploma.usecase";
import { GetStudentDiplomaResponse, GetStudentDiplomaRouteConfig } from "./getStudentDiploma.types";

@Controller()
export class GetStudentDiplomaController extends BaseController<GetStudentDiplomaRouteConfig> {
  constructor(
    @inject("GetStudentDiplomaUseCase") private getStudentDiplomaUseCase: GetStudentDiplomaUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentDiplomaRouteConfig>): Promise<APIResponse> {
    const dto: getStudentDiplomaRequestDto = {
      studentNewId: req.params.studentNewId,
      termNewId: req.query.termNewId,
      schoolYearId: req.query.schoolYearId,
    };

    const response = await this.getStudentDiplomaUseCase.execute(dto);

    return new SuccessResponse<GetStudentDiplomaResponse>("global.success", response);
  }
}
