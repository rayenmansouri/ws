import { Parent } from "./../../../../../feature/parents/domain/parent.entity";
import {
  GetChildAttendanceStatsUseCase,
  GetChildAttendanceStatsUseCaseRequestDto,
} from "./../../../../../feature/parents/useCases/GetChildAttendanceStats.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetChildAttendanceStatsRouteConfig,
  GetChildAttendanceStatsResponse,
} from "./GetChildAttendanceStats.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetChildAttendanceStatsController extends BaseController<GetChildAttendanceStatsRouteConfig> {
  constructor(
    @inject("GetChildAttendanceStatsUseCase")
    private readonly getChildAttendanceStatsUseCase: GetChildAttendanceStatsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetChildAttendanceStatsRouteConfig>): Promise<void | APIResponse> {
    const dto: GetChildAttendanceStatsUseCaseRequestDto = {
      parent: req.user as unknown as Parent,
      studentNewId: req.params.studentNewId,
      language: req.language,
      dateInterval: {
        from: req.query.from,
        to: req.query.to,
      },
    };

    const stats = await this.getChildAttendanceStatsUseCase.execute(dto);

    return new SuccessResponse<GetChildAttendanceStatsResponse>("global.success", stats);
  }
}
