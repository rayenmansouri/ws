import { BankCheck } from "../../../../../feature/studentPayments/domain/bankCheck.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListBankChecksValidation } from "./listBankChecks.validation";

export type ListBankChecksRouteConfig = ListBankChecksValidation & { files: never };
export type ListBankChecksResponse = ResponseWithPagination<BankCheck>;
