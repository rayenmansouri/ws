import { z } from "zod";
import {
  validateDate,
  validateID,
  validateNewId,
  validatePhoneNumber,
} from "../../../../../core/validator";
import {
  PAYMENT_METHODS_ENUM,
  SPLIT_STATUS_ENUM,
} from "../../../../../feature/studentPayments/domain/invoice.entity";

const body = z.object({
  services: z
    .array(
      z.object({
        id: validateID(),
        discount: z.number().min(0).max(100),
        month: z.number().min(0).max(11),
      }),
    )
    .min(1),
  email: z.string().email().nullish(),
  phoneNumber: validatePhoneNumber().nullish(),
  discount: z.number().min(0).max(100),
  splits: z
    .array(
      z.object({
        _id: validateID().optional(),
        amount: z.number().min(1),
        dueDate: validateDate(),
        paymentMethod: z.nativeEnum(PAYMENT_METHODS_ENUM),
        status: z.nativeEnum(SPLIT_STATUS_ENUM),
      }),
    )
    .refine(arr => arr.length === 0 || arr.length >= 2, "Splits must be 0, 2, or more than 2")
    .optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  invoiceNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateInvoiceValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateInvoiceValidation = {
  body,
  params,
};
