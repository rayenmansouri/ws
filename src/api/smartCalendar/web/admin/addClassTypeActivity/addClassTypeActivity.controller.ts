import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddClassTypeActivityRouteConfig,
  AddClassTypeActivityResponse,
} from "./addClassTypeActivity.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { AddClassTypeActivityUseCase } from "../../../../../feature/smartCalendar/useCases/AddClassTypeActivity.usecase";

@Controller()
export class AddClassTypeActivityController extends BaseController<AddClassTypeActivityRouteConfig> {
  constructor(
    @inject("AddClassTypeActivityUseCase")
    private addClassTypeActivityUseCase: AddClassTypeActivityUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddClassTypeActivityRouteConfig>): Promise<void | APIResponse> {
    await this.addClassTypeActivityUseCase.execute({
      classTypeNewId: req.params.classTypeNewId,
      sessionType: req.body.sessionType,
      subjectType: req.body.subjectType,
      subSubjectType: req.body.subSubjectType ?? null,
      perGroup: req.body.perGroup ?? false,
      week: req.body.week ?? null,
      durationInMinutes: req.body.durationInMinutes,
    });

    return new SuccessResponse<AddClassTypeActivityResponse>(
      "smartCalendar.activityAddedSuccessfully",
    );
  }
}
