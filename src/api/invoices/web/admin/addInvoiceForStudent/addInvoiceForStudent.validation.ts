import { z } from "zod";
import {
  emailValidation,
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";
import { INVOICE_TYPE_ENUM } from "../../../../../feature/studentPayments/domain/invoice.entity";

const body = z
  .object({
    studentNewId: validateNewId(),
    invoiceType: z.enum(["monthly", "oneTime"]),
    services: z.array(z.object({ id: validateID(), discount: z.number().min(0).max(100) })).min(1),
    emailReminder: z.boolean().optional(),
    email: emailValidation().optional(),
    smsReminder: z.boolean().optional(),
    phoneNumber: validatePhoneNumber().optional(),
    discount: z.number().min(0).max(100),
    dates: z.array(validateDate()).min(1),
  })
  .refine(el => {
    if (el.emailReminder === true && !el.email) return false;
    if (el.smsReminder === true && !el.phoneNumber) return false;
    return true;
  }, "email or phone number is required")

  .refine(el => {
    const isOneTimeInvoice = el.invoiceType === INVOICE_TYPE_ENUM.ONE_TIME;
    const isContainsMoreThanOneDate = el.dates.length !== 1;
    if (isOneTimeInvoice && isContainsMoreThanOneDate) return false;
    return true;
  }, "only one date is required for oneTime invoices");
type TBody = z.infer<typeof body>;

export type AddInvoiceForStudentValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addInvoiceForStudentValidation = {
  body,
};
