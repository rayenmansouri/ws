import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdatePaymentTemplateRouteConfig,
  UpdatePaymentTemplateResponse,
} from "./updatePaymentTemplate.types";
import {
  UpdatePaymentTemplateUseCase,
  updatePaymentTemplateRequestDto,
} from "../../../../../feature/paymentTemplate/usecases/updatePaymentTemplate.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdatePaymentTemplateController extends BaseController<UpdatePaymentTemplateRouteConfig> {
  constructor(
    @inject("UpdatePaymentTemplateUseCase") private readonly usecase: UpdatePaymentTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdatePaymentTemplateRouteConfig>): Promise<void | APIResponse> {
    const dto: updatePaymentTemplateRequestDto = {
      paymentTemplateId: req.params.paymentTemplateId,
      name: req.body.name,
      services: req.body.services!,
      discount: req.body.discount!,
    };
    await this.usecase.execute(dto);

    return new SuccessResponse<UpdatePaymentTemplateResponse>("global.success");
  }
}
