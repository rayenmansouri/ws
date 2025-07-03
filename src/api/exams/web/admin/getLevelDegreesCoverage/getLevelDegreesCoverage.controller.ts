import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetLevelDegreesCoverageRouteConfig,
  GetLevelDegreesCoverageResponse,
} from "./getLevelDegreesCoverage.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetLevelDegreesCoverageUsecase } from "../../../../../feature/examGrade/useCases/GetLevelDegreesCoverage.usecase";

@Controller()
export class GetLevelDegreesCoverageController extends BaseController<GetLevelDegreesCoverageRouteConfig> {
  constructor(
    @inject("GetLevelDegreesCoverageUsecase")
    private getLevelDegreesCoverageUsecase: GetLevelDegreesCoverageUsecase,
  ) {
    super();
  }

  async main(): Promise<void | APIResponse> {
    const levelDegreesCoverage = await this.getLevelDegreesCoverageUsecase.execute();

    return new SuccessResponse<GetLevelDegreesCoverageResponse>(
      "global.success",
      levelDegreesCoverage,
    );
  }
}
