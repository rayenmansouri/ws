import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SupplierRepo } from "../../../../../feature/supplier/Supplier.repo";
import { ListSuppliersResponse, ListSuppliersRouteConfig } from "./listSuppliers.types";

@Controller()
export class ListSuppliersController extends BaseExportController<
  ListSuppliersRouteConfig,
  ListSuppliersResponse
> {
  constructor(@inject("SupplierRepo") private supplierRepo: SupplierRepo) {
    super();
  }

  async main(req: TypedRequest<ListSuppliersRouteConfig>): Promise<APIResponse> {
    const response = await this.supplierRepo.listSuppliersWithExpenses(
      { search: req.query.search, expenseId: req.query.expenseId },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListSuppliersResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListSuppliersResponse): Array<{
    newId: string;
    name: string;
    expenses: string;
    fiscalCode: string;
  }> {
    return data.docs.map(supplier => {
      return {
        newId: supplier.name,
        name: supplier.name,
        expenses: supplier.expenses.map(expense => String(expense.name)).join(","),
        fiscalCode: supplier.fiscalCode?.toString() || "-",
      };
    });
  }
}
