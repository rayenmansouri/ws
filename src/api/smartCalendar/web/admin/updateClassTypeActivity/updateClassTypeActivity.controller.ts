import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateClassTypeActivityUseCase } from "../../../../../feature/smartCalendar/useCases/UpdateClassTypeActivity.usecase";
import {
  UpdateClassTypeActivityRouteConfig,
  UpdateClassTypeActivityResponse,
} from "./updateClassTypeActivity.types";

@Controller()
export class UpdateClassTypeActivityController extends BaseController<UpdateClassTypeActivityRouteConfig> {
  constructor(
    @inject("UpdateClassTypeActivityUseCase")
    private readonly updateClassTypeActivityUseCase: UpdateClassTypeActivityUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateClassTypeActivityRouteConfig>): Promise<void | APIResponse> {
    await this.updateClassTypeActivityUseCase.execute({
      classTypeNewId: req.params.classTypeNewId,
      activityIndex: +req.params.activityIndex,
      durationInMinutes: req.body.durationInMinutes,
      sessionTypeId: req.body.sessionType,
      perGroup: req.body.perGroup,
      week: req.body.week,
    });

    return new SuccessResponse<UpdateClassTypeActivityResponse>(
      "smartCalendar.activityUpdatedSuccessfully",
    );
  }
}
