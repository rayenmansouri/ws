import { InvoiceSearchDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetSearchInvoiceValidation } from "./getSearchInvoice.validation";

export type GetSearchInvoiceRouteConfig = GetSearchInvoiceValidation & { files: never };
export type GetSearchInvoiceResponse = InvoiceSearchDto[];
