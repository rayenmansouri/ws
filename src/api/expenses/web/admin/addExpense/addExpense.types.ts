import { AddExpenseValidation } from "./addExpense.validation";

export type AddExpenseRouteConfig = AddExpenseValidation & { files: never };
export type AddExpenseResponse = void;
