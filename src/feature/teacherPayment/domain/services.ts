import {
  TTransactionAdjustmentTypeEnum,
  TRANSACTION_ADJUSTMENT_TYPE_ENUM,
} from "./teacherPaymentConfiguration.entity";

export class TeacherPaymentDomainServices {
  static addBonusOrObservation(
    transactionType: TTransactionAdjustmentTypeEnum,
    amount: number,
  ): number {
    return transactionType === TRANSACTION_ADJUSTMENT_TYPE_ENUM.BONUS ? amount : amount * -1;
  }

  static getTotalTransactionAdjustmentAmount(
    transactionAdjustment: { type: TTransactionAdjustmentTypeEnum; amount: number }[],
  ): number {
    return transactionAdjustment.reduce(
      (acc, transaction) => acc + this.addBonusOrObservation(transaction.type, transaction.amount),
      0,
    );
  }
}
