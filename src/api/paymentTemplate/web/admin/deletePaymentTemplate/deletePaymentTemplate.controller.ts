import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  DeletePaymentTemplateRouteConfig,
  DeletePaymentTemplateResponse,
} from "./deletePaymentTemplate.types";
import { inject } from "../../../../../core/container/TypedContainer";
import {
  DeletePaymentTemplateUseCase,
  deletePaymentTemplateRequestDto,
} from "../../../../../feature/paymentTemplate/usecases/deletePaymentTemplate.usecase";

@Controller()
export class DeletePaymentTemplateController extends BaseController<DeletePaymentTemplateRouteConfig> {
  constructor(
    @inject("DeletePaymentTemplateUseCase") private readonly usecase: DeletePaymentTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeletePaymentTemplateRouteConfig>): Promise<void | APIResponse> {
    const dto: deletePaymentTemplateRequestDto = {
      paymentTemplateIds: req.body.paymentTemplateIds,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<DeletePaymentTemplateResponse>("global.success");
  }
}
