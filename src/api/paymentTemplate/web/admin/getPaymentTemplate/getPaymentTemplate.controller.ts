import {
  GetPaymentTemplateUseCase,
  getPaymentTemplateRequestDto,
} from "./../../../../../feature/paymentTemplate/usecases/getPaymentTemplate.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetPaymentTemplateRouteConfig,
  GetPaymentTemplateResponse,
} from "./getPaymentTemplate.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetPaymentTemplateController extends BaseController<GetPaymentTemplateRouteConfig> {
  constructor(
    @inject("GetPaymentTemplateUseCase") private readonly usecase: GetPaymentTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetPaymentTemplateRouteConfig>): Promise<void | APIResponse> {
    const dto: getPaymentTemplateRequestDto = {
      paymentTemplate: req.params.paymentTemplateId,
    };
    const res = await this.usecase.execute(dto);
    return new SuccessResponse<GetPaymentTemplateResponse>("global.success", res);
  }
}
