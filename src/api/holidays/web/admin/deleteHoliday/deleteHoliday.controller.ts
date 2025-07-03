import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteHolidayUseCase } from "../../../../../feature/holidays/useCases/DeleteHoliday.usecase";
import { DeleteHolidayRouteConfig, DeleteHolidayResponse } from "./deleteHoliday.types";

@Controller()
export class DeleteHolidayController extends BaseController<DeleteHolidayRouteConfig> {
  constructor(@inject("DeleteHolidayUseCase") private deleteHolidayUseCase: DeleteHolidayUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteHolidayRouteConfig>): Promise<void | APIResponse> {
    await this.deleteHolidayUseCase.execute(req.params.holidayNewId);
    return new SuccessResponse<DeleteHolidayResponse>("holiday.deletedSuccessfully");
  }
}
