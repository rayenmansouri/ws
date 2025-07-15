import { StudentInvoiceDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetStudentInvoicesValidation } from "./getStudentInvoices.validation";

export type GetStudentInvoicesRouteConfig = GetStudentInvoicesValidation & { files: never };
export type GetStudentInvoicesResponse = StudentInvoiceDto;
