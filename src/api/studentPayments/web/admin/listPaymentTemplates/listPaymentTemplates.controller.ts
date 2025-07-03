import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { PaymentTemplateRepo } from "../../../../../feature/studentPayments/PaymentTemplate.repo";
import {
  ListPaymentTemplatesResponse,
  ListPaymentTemplatesRouteConfig,
} from "./listPaymentTemplates.types";

@Controller()
export class ListPaymentTemplatesController extends BaseExportController<
  ListPaymentTemplatesRouteConfig,
  ListPaymentTemplatesResponse
> {
  constructor(
    @inject("PaymentTemplateRepo") private paymentTemplateRepository: PaymentTemplateRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListPaymentTemplatesRouteConfig>): Promise<APIResponse> {
    const response = await this.paymentTemplateRepository.listPaymentTemplates(
      {
        search: req.query.search,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListPaymentTemplatesResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }

  formatDataBeforeExport(data: ListPaymentTemplatesResponse): Array<{
    name: string;
    services: string;
    discount: string;
    totalAmount: string;
  }> {
    return data.docs.map(paymentTemplate => ({
      name: paymentTemplate.name,
      services: paymentTemplate.services.map(service => service.name).join(", "),
      discount: paymentTemplate.discount.toString(),
      totalAmount: String(paymentTemplate.totalAmount),
    }));
  }
}
