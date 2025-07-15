import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ExpenseRepo } from "../../../../../feature/expenses/domain/Expense.repo";
import { ListExpensesResponse, ListExpensesRouteConfig } from "./listExpenses.types";

@Controller()
export class ListExpensesController extends BaseExportController<
  ListExpensesRouteConfig,
  ListExpensesResponse
> {
  constructor(@inject("ExpenseRepo") private expenseRepo: ExpenseRepo) {
    super();
  }

  async main(req: TypedRequest<ListExpensesRouteConfig>): Promise<APIResponse> {
    const response = await this.expenseRepo.listExpenses(
      { search: req.query.search },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListExpensesResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListExpensesResponse): Array<{
    name: string;
    description: string;
    amount: string;
    newId: string;
  }> {
    return data.docs.map(doc => {
      return {
        name: doc.name,
        description: doc.description || "-",
        amount: doc.amount?.toString() || "-",
        newId: doc.newId,
      };
    });
  }
}
