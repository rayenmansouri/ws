import { BankTransferStrategyDto } from "../../invoices/strategies/bankTransferStrategy";
import { ID } from "./../../../types/BaseEntity";
import { cashPaymentStrategyDto } from "../../invoices/strategies/cashPaymentStrategy";

import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { BankCheckPaymentStrategyDto } from "../../invoices/strategies/bankCheckStrategy";

export type commonPaymentDto = {
  invoiceNewId: string;
  phoneNumber: string | null;
  parentId: ID;
  splitIndex?: number;
  adminId: ID;
  tenantId: ID;
};
export type PaymentDtos = (
  | cashPaymentStrategyDto
  | BankCheckPaymentStrategyDto
  | BankTransferStrategyDto
) &
  commonPaymentDto;

export interface PaymentStrategy {
  pay(invoice: Invoice, paymentData: PaymentDtos): Promise<Invoice>;
}
