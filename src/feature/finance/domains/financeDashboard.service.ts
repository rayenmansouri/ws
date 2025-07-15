export class FinanceService {
  static sortDistribution<T extends { amount: number }>(distribution: T[]): T[] {
    return distribution.sort((a, b) => b.amount - a.amount);
  }

  static calculateRate(currentAmount: number, previousAmount: number): number | null {
    if (previousAmount === 0) return null;
    const rate = currentAmount / previousAmount;

    if (currentAmount >= previousAmount) return rate;
    return rate * -1;
  }
}
