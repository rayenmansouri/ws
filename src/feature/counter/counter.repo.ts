export abstract class CounterRepo {
  abstract getCurrentCount(): Promise<number>;

  abstract incrementAndGet(): Promise<number>;

  abstract incrementByValue(value: number): Promise<void>;

  formatNewId(count: number): string {
    return count.toString().padStart(5, "0");
  }
}
