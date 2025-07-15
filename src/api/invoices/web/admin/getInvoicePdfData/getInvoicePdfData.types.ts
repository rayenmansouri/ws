import { InvoicePdfDataDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetInvoicePdfDataValidation } from "./getInvoicePdfData.validation";

export type GetInvoicePdfDataRouteConfig = GetInvoicePdfDataValidation & { files: never };
export type GetInvoicePdfDataResponse = InvoicePdfDataDto;
