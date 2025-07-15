import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAvailableClassroomInWeeklySessionUseCase } from "../../../../../feature/classrooms/useCases/GetAvailableClassroomInWeeklySession.usecase";
import {
  GetAvailableClassroomInWeeklySessionRouteConfig,
  GetAvailableClassroomInWeeklySessionResponse,
} from "./getAvailableClassroomInWeeklySession.types";

@Controller()
export class GetAvailableClassroomInWeeklySessionController extends BaseController<GetAvailableClassroomInWeeklySessionRouteConfig> {
  constructor(
    @inject("GetAvailableClassroomInWeeklySessionUseCase")
    private getAvailableClassroomInWeeklySessionUseCase: GetAvailableClassroomInWeeklySessionUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetAvailableClassroomInWeeklySessionRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getAvailableClassroomInWeeklySessionUseCase.execute(req.query);

    return new SuccessResponse<GetAvailableClassroomInWeeklySessionResponse>(
      "global.success",
      response,
    );
  }
}
