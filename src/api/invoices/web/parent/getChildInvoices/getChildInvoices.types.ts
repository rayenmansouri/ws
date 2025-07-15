import { StudentInvoiceDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetChildInvoicesValidation } from "./getChildInvoices.validation";

export type GetChildInvoicesRouteConfig = GetChildInvoicesValidation & { files: never };
export type GetChildInvoicesResponse = StudentInvoiceDto;
