import { InvoiceDetailsDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetInvoiceDetailsValidation } from "./getInvoiceDetails.validation";

export type GetInvoiceDetailsRouteConfig = GetInvoiceDetailsValidation & { files: never };
export type GetInvoiceDetailsResponse = InvoiceDetailsDto;
