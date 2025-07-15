import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSmartSchedulePDFUseCase } from "../../../../../feature/smartCalendar/useCases/GetSmartSchedulePDF.usecase";
import {
  GetSmartSchedulePDFRouteConfig,
  GetSmartSchedulePDFResponse,
} from "./getSmartSchedulePDF.types";

@Controller()
export class GetSmartSchedulePDFController extends BaseController<GetSmartSchedulePDFRouteConfig> {
  constructor(
    @inject("GetSmartSchedulePDFUseCase")
    private readonly getSmartSchedulePDFUseCase: GetSmartSchedulePDFUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSmartSchedulePDFRouteConfig>): Promise<void | APIResponse> {
    const schedule = await this.getSmartSchedulePDFUseCase.execute(req.params.scheduleNewId);

    return new SuccessResponse<GetSmartSchedulePDFResponse>("global.success", schedule);
  }
}
