import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { Expense } from "../../../../../feature/expenses/domain/expense.entity";
import { ExpenseRepo } from "../../../../../feature/expenses/domain/Expense.repo";
import { SupplierRepo } from "../../../../../feature/supplier/Supplier.repo";
import { SupplierService } from "../../../../../feature/supplier/Supplier.service";
import { UpdateSupplierRouteConfig } from "./updateSupplier.types";

@Controller()
export class UpdateSupplierController extends BaseController<UpdateSupplierRouteConfig> {
  constructor(
    @inject("ExpenseRepo") private expenseRepo: ExpenseRepo,
    @inject("SupplierRepo") private supplierRepo: SupplierRepo,
    @inject("SupplierService") private supplierService: SupplierService,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSupplierRouteConfig>): Promise<void | APIResponse> {
    let expenses: Expense[] | undefined = undefined;

    if (req.body.expenses) {
      expenses = await this.expenseRepo.findManyByNewIdsOrThrow(
        req.body.expenses,
        "notFound.expense",
      );
    }

    const supplier = await this.supplierRepo.findOneByNewIdOrThrow(
      req.params.supplierNewId,
      "notFound.supplier",
    );

    await this.supplierService.updateSupplier(supplier, {
      ...req.body,
      expenses: expenses ? expenses.map(expense => expense._id) : undefined,
    });

    return new SuccessResponse("supplier.updatedSuccessfully");
  }
}
