import { Expense } from "../../../../../feature/expenses/domain/expense.entity";
import { Supplier } from "../../../../../feature/supplier/supplier.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSuppliersValidation } from "./listSuppliers.validation";

export type ListSuppliersRouteConfig = ListSuppliersValidation & { files: never };
export type ListSuppliersResponse = ResponseWithPagination<
  Omit<Supplier, "expenses"> & { expenses: Expense[] }
>;
