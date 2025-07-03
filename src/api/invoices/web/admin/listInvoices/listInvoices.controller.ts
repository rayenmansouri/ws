import { omit } from "lodash";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListInvoicesUseCase } from "../../../../../feature/invoices/useCases/listInvoices.usecase";
import { ListInvoicesRequestDTO } from "../../../../../feature/invoices/useCases/listInvoices.usecase";
import { ListInvoicesResponse, ListInvoicesRouteConfig } from "./listInvoices.types";

@Controller()
export class ListInvoicesController extends BaseExportController<
  ListInvoicesRouteConfig,
  ListInvoicesResponse
> {
  constructor(
    @inject("ListInvoicesUseCase") private readonly listInvoicesUsecase: ListInvoicesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListInvoicesRouteConfig>): Promise<APIResponse> {
    const dto: ListInvoicesRequestDTO = {
      query: {
        month: req.query.month,
        invoiceType: req.query.invoiceType,
        paymentMethod: req.query.paymentMethod,
      },
      search: {
        searchNewId: req.query.searchNewId,
        searchType: req.query.searchType,
        status: req.query.status,
      },
      pagination: {
        page: req.query.page,
        limit: req.query.limit,
      },
    };

    const result = await this.listInvoicesUsecase.execute(dto);

    return new SuccessResponse<ListInvoicesResponse>("global.success", result);
  }
  formatDataBeforeExport(data: ListInvoicesResponse): Array<Record<string, string>> {
    const response = data.docs.map(doc => {
      const parents = doc.parents.map(parent => parent.fullName).join(", ");
      const students = doc.students.map(student => student.fullName).join(", ");

      const dates = doc.dates.map(date => new Date(date).toLocaleDateString("fr")).join(", ");

      const paidAt = doc.paidAt?.toLocaleString("fr") || "-";
      const amount = doc.amount.toString();
      return omit({ ...doc, students, parents, dates, paidAt, amount }, ["splits"]);
    });

    return response;
  }
}
