import {
  AddPaymentTemplateUseCase,
  addPaymentTemplateRequestDto,
} from "./../../../../../feature/paymentTemplate/usecases/addPaymentTemplate.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddPaymentTemplateRouteConfig,
  AddPaymentTemplateResponse,
} from "./addPaymentTemplate.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class AddPaymentTemplateController extends BaseController<AddPaymentTemplateRouteConfig> {
  constructor(
    @inject("AddPaymentTemplateUseCase")
    private readonly usecase: AddPaymentTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddPaymentTemplateRouteConfig>): Promise<void | APIResponse> {
    const dto: addPaymentTemplateRequestDto = {
      name: req.body.name,
      discount: req.body.discount,
      services: req.body.services,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<AddPaymentTemplateResponse>("global.success");
  }
}
