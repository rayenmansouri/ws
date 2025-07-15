import { Expense } from "../../../../../feature/expenses/domain/expense.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListExpensesValidation } from "./listExpenses.validation";

export type ListExpensesRouteConfig = ListExpensesValidation & { files: never };
export type ListExpensesResponse = ResponseWithPagination<Expense>;
