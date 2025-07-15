import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddInvoiceForStudentUseCase } from "../../../../../feature/invoices/useCases/AddInvoiceForStudent.usecase";
import {
  AddInvoiceForStudentRouteConfig,
  AddInvoiceForStudentResponse,
} from "./addInvoiceForStudent.types";

@Controller()
export class AddInvoiceForStudentController extends BaseController<AddInvoiceForStudentRouteConfig> {
  constructor(
    @inject("AddInvoiceForStudentUseCase")
    private addInvoiceForStudentUseCase: AddInvoiceForStudentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddInvoiceForStudentRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addInvoiceForStudentUseCase.execute({
      ...req.body,
      emailReminder: req.body.emailReminder === true,
      smsReminder: req.body.smsReminder === true,
    });
    return new SuccessResponse<AddInvoiceForStudentResponse>("global.success", response);
  }
}
