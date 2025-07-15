import { BankTransferStrategy } from "./bankTransferStrategy";
import { BankCheckStrategy } from "./bankCheckStrategy";
import { PaymentStrategy } from "../../invoices/domain/paymentStrategy";
import { TPaymentMethodsEnum } from "../../studentPayments/domain/invoice.entity";
import { CashPaymentStrategy } from "./cashPaymentStrategy";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";

@injectable()
export class PaymentStrategyFactory {
  constructor(
    @inject("CashPaymentStrategy") private readonly cashPaymentStrategy: CashPaymentStrategy,
    @inject("BankCheckStrategy") private readonly bankCheckStrategy: BankCheckStrategy,
    @inject("BankTransferStrategy") private readonly bankTransferStrategy: BankTransferStrategy,
  ) {}

  getStrategy(paymentMethod: TPaymentMethodsEnum): PaymentStrategy {
    switch (paymentMethod) {
      case "cash":
        return this.cashPaymentStrategy;
      case "bankCheck":
        return this.bankCheckStrategy;
      case "bankTransfer":
        return this.bankTransferStrategy;
      default:
        throw new Error("unsupported payment method");
    }
  }
}
