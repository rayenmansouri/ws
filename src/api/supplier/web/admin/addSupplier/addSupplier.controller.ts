import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ExpenseRepo } from "../../../../../feature/expenses/domain/Expense.repo";
import { SupplierService } from "../../../../../feature/supplier/Supplier.service";
import { AddSupplierRouteConfig } from "./addSupplier.types";

@Controller()
export class AddSupplierController extends BaseController<AddSupplierRouteConfig> {
  constructor(
    @inject("ExpenseRepo") private expenseRepo: ExpenseRepo,
    @inject("SupplierService") private supplierService: SupplierService,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSupplierRouteConfig>): Promise<void | APIResponse> {
    const expenses = await this.expenseRepo.findManyByNewIdsOrThrow(
      req.body.expenses,
      "notFound.expense",
    );

    const expenseIds = expenses.map(expense => expense._id);

    await this.supplierService.addSupplier({
      ...req.body,
      expenses: expenseIds,
      fiscalCode: req.body.fiscalCode,
    });

    return new SuccessResponse("supplier.addedSuccessfully");
  }
}
