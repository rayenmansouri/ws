import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SwitchLevelToNextSchoolYearUseCase } from "../../../../../feature/examGrade/useCases/SwitchLevelToNextSchoolYear.usecase";
import {
  SwitchLevelsToNextSchoolYearRouteConfig,
  SwitchLevelsToNextSchoolYearResponse,
} from "./switchLevelsToNextSchoolYear.types";
import { TypedRequest } from "../../../../../core/express/types";

@Controller()
export class SwitchLevelsToNextSchoolYearController extends BaseController<SwitchLevelsToNextSchoolYearRouteConfig> {
  constructor(
    @inject("SwitchLevelToNextSchoolYearUseCase")
    private switchLevelToNextSchoolYearUseCase: SwitchLevelToNextSchoolYearUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<SwitchLevelsToNextSchoolYearRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.switchLevelToNextSchoolYearUseCase.execute(req.body.schoolYearName);

    return new SuccessResponse<SwitchLevelsToNextSchoolYearResponse>("global.success");
  }
}
