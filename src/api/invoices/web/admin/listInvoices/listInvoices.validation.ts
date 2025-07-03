import {
  PAYMENT_METHODS_ENUM,
  INVOICE_TYPE_ENUM,
  INVOICE_STATUS_ENUM,
} from "./../../../../../feature/studentPayments/invoice.entity";
import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";
import { paginationOptionsValidation } from "./../../../../../core/validator";

const query = z
  .object({
    searchNewId: validateNewId().optional(),
    searchType: z.enum(["student", "parent", "class"]).optional(),
    status: z.nativeEnum(INVOICE_STATUS_ENUM).optional(),
    month: z.array(z.number()).optional(),
    invoiceType: z.nativeEnum(INVOICE_TYPE_ENUM).optional(),
    paymentMethod: z.nativeEnum(PAYMENT_METHODS_ENUM).optional(),
  })
  .merge(paginationOptionsValidation);

type TQuery = z.infer<typeof query>;

export type ListInvoicesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listInvoicesValidation = {
  query,
};
