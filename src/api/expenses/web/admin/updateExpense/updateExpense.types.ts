import { UpdateExpenseValidation } from "./updateExpense.validation";

export type UpdateExpenseRouteConfig = UpdateExpenseValidation & { files: never };
export type UpdateExpenseResponse = void;
