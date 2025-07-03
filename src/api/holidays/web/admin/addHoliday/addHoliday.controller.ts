import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddHolidayUseCase } from "../../../../../feature/holidays/useCases/AddHoliday.usecase";
import { AddHolidayRouteConfig, AddHolidayResponse } from "./addHoliday.types";

@Controller()
export class AddHolidayController extends BaseController<AddHolidayRouteConfig> {
  constructor(@inject("AddHolidayUseCase") private addHolidayUseCase: AddHolidayUseCase) {
    super();
  }

  async main(req: TypedRequest<AddHolidayRouteConfig>): Promise<void | APIResponse> {
    await this.addHolidayUseCase.execute(req.body);

    return new SuccessResponse<AddHolidayResponse>("holiday.createdSuccessfully");
  }
}
