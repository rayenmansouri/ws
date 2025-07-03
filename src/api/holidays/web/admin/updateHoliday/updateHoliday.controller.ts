import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateHolidayUseCase } from "../../../../../feature/holidays/useCases/UpdateHoliday.usecase";
import { UpdateHolidayRouteConfig, UpdateHolidayResponse } from "./updateHoliday.types";

@Controller()
export class UpdateHolidayController extends BaseController<UpdateHolidayRouteConfig> {
  constructor(@inject("UpdateHolidayUseCase") private updateHolidayUseCase: UpdateHolidayUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateHolidayRouteConfig>): Promise<void | APIResponse> {
    await this.updateHolidayUseCase.execute(req.params.holidayNewId, req.body);
    return new SuccessResponse<UpdateHolidayResponse>("holiday.updatedSuccessfully");
  }
}
