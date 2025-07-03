import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListHolidayUseCase } from "../../../../../feature/holidays/useCases/ListHoliday.usecase";
import { ListHolidayRouteConfig, ListHolidayResponse } from "./listHoliday.types";

@Controller()
export class ListHolidayController extends BaseController<ListHolidayRouteConfig> {
  constructor(@inject("ListHolidayUseCase") private listHolidayUseCase: ListHolidayUseCase) {
    super();
  }

  async main(req: TypedRequest<ListHolidayRouteConfig>): Promise<void | APIResponse> {
    const holiday = await this.listHolidayUseCase.execute({ ...req.query, name: req.query.search });
    return new SuccessResponse<ListHolidayResponse>("global.success", holiday);
  }
}
