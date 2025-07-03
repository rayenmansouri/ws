export const calculateFinalAmountWithDiscount = (
  amountsAndDiscounts: { amount: number; discount: number }[],
  totalDiscount: number,
): number => {
  const amountWithEveryDiscount = amountsAndDiscounts.reduce(
    (acc, data) => (acc += data.amount * (1 - data.discount / 100)),
    0,
  );
  const finalAmount = +(amountWithEveryDiscount * (1 - totalDiscount / 100)).toFixed(2);
  return finalAmount;
};
