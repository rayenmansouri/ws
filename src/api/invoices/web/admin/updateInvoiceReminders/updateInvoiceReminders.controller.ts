import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateInvoiceRemindersUseCase } from "../../../../../feature/invoices/useCases/UpdateInvoiceReminders.usecase";
import {
  UpdateInvoiceRemindersRouteConfig,
  UpdateInvoiceRemindersResponse,
} from "./updateInvoiceReminders.types";

@Controller()
export class UpdateInvoiceRemindersController extends BaseController<UpdateInvoiceRemindersRouteConfig> {
  constructor(
    @inject("UpdateInvoiceRemindersUseCase")
    private updateInvoiceRemindersUseCase: UpdateInvoiceRemindersUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateInvoiceRemindersRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;
    const dto = { invoiceNewId, email: req.body.email, phoneNumber: req.body.phoneNumber };

    const response = await this.updateInvoiceRemindersUseCase.execute(dto);
    return new SuccessResponse<UpdateInvoiceRemindersResponse>("global.success", response);
  }
}
