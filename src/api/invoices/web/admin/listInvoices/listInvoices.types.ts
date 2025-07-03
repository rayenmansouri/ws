import { InvoiceDTO } from "../../../../../feature/invoices/dtos/invoice.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListInvoicesValidation } from "./listInvoices.validation";

export type ListInvoicesRouteConfig = ListInvoicesValidation & { files: never };
export type ListInvoicesResponse = ResponseWithPagination<InvoiceDTO>;
