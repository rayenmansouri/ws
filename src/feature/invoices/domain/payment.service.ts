import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import {
  Invoice,
  SPLIT_STATUS_ENUM,
  TPaymentMethodsEnum,
} from "../../studentPayments/domain/invoice.entity";

export class PaymentServices {
  constructor() {}

  static isAllSplitsPaid(invoice: Invoice): boolean {
    return invoice.paymentSplits.every(split => split.status === SPLIT_STATUS_ENUM.PAID);
  }

  static isSplitUsesPaymentMethod(
    invoice: Invoice,
    splitIndex: number,
    expectedPaymentMethod: TPaymentMethodsEnum,
  ): boolean {
    const currentSplit = invoice.paymentSplits[splitIndex - 1];

    if (currentSplit.paymentMethod !== expectedPaymentMethod) {
      return false;
    }
    return true;
  }

  static isInvoicePaid(invoice: Invoice): boolean {
    return invoice.status === "paid";
  }

  static isSplitPaid(invoice: Invoice, splitIndex: number): boolean {
    return invoice.paymentSplits[splitIndex].status === "paid";
  }
  static validateSplitIndex(invoice: Invoice, splitIndex: number | undefined | null): void {
    if (splitIndex === undefined || splitIndex === null || isNaN(splitIndex) || splitIndex === 0) {
      throw new InternalError("Split index must be provided and be a positive number");
    }

    if (splitIndex > invoice.paymentSplits.length) {
      throw new BadRequestError("invoice.paymentSplitIndexOutOfRange");
    }
  }
}
