import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ServiceRepo } from "../../../../../feature/studentPayments/Service.repo";
import { ListServicesResponse, ListServicesRouteConfig } from "./listServices.types";

@Controller()
export class ListServicesController extends BaseExportController<
  ListServicesRouteConfig,
  ListServicesResponse
> {
  constructor(@inject("ServiceRepo") private serviceRepo: ServiceRepo) {
    super();
  }

  async main(req: TypedRequest<ListServicesRouteConfig>): Promise<APIResponse> {
    const response = await this.serviceRepo.listServices(
      {
        search: req.query.search,
        showByDefault: req.query.showByDefault,
        invoiceType: req.query.invoiceType,
      },
      { limit: req.query.limit, page: req.query.page },
    );

    return new SuccessResponse<ListServicesResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListServicesResponse): Array<{
    newId: string;
    name: string;
    description: string;
    showByDefault: string;
    amount: string;
    invoiceType: string;
  }> {
    return data.docs.map(doc => {
      return {
        newId: doc.newId,
        name: doc.name,
        description: doc.description || "-",
        amount: doc.amount.toString(),
        invoiceType: doc.invoiceType.toString(),
        showByDefault: doc.showByDefault ? "true" : "false",
      };
    });
  }
}
