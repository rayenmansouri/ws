import { BankTransfer } from "./../../../../../feature/invoices/domain/bankTransfer.entity";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListBankTransfersValidation } from "./listBankTransfers.validation";

export type ListBankTransfersRouteConfig = ListBankTransfersValidation & { files: never };
export type ListBankTransfersResponse = ResponseWithPagination<
  Omit<BankTransfer, "invoice"> & {
    phoneNumber: string | null;
  }
>;
