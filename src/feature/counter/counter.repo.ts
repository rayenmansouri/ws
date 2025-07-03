import { BaseRepo } from "../../core/BaseRepo";

export abstract class CounterRepo extends BaseRepo<Counter> {
  abstract getCurrentCount(): Promise<number>;

  abstract incrementAndGet(): Promise<number>;

  abstract incrementByValue(value: number): Promise<void>;

  formatNewId(count: number): string {
    return count.toString().padStart(5, "0");
  }
}
