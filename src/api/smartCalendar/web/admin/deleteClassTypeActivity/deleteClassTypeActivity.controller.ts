import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteClassTypeActivityUseCase } from "../../../../../feature/smartCalendar/useCases/DeleteClassTypeActivity.usecase";
import {
  DeleteClassTypeActivityRouteConfig,
  DeleteClassTypeActivityResponse,
} from "./deleteClassTypeActivity.types";

@Controller()
export class DeleteClassTypeActivityController extends BaseController<DeleteClassTypeActivityRouteConfig> {
  constructor(
    @inject("DeleteClassTypeActivityUseCase")
    private deleteClassTypeActivityUseCase: DeleteClassTypeActivityUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteClassTypeActivityRouteConfig>): Promise<void | APIResponse> {
    await this.deleteClassTypeActivityUseCase.execute(
      req.params.classTypeNewId,
      +req.params.activityIndex,
    );

    return new SuccessResponse<DeleteClassTypeActivityResponse>(
      "smartCalendar.activityDeletedSuccessfully",
    );
  }
}
