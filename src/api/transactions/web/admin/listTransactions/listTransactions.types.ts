import { TTransactionTypeEnum } from "../../../../../features/finance/types/getTransactionDashboard.types";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListTransactionsValidation } from "./listTransactions.validation";

export type ListTransactionsRouteConfig = ListTransactionsValidation & { files: never };
export type ListTransactionsResponse = ResponseWithPagination<{
  _id: ID;
  name: string;
  amount: number;
  transactionType: TTransactionTypeEnum;
  level: {
    _id: ID;
    name: string;
  };
  paidAt: Date;
  supplier: {
    _id: ID;
    newId: string;
    name: string;
  } | null;
  createdAt: Date;
  createdBy: {
    _id: ID;
    newId: string;
    fullName: string;
    avatar: string;
    role: string;
  };
}>;
