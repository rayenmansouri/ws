import { Connection } from "mongoose";
import { CounterSchema } from "../../../core/newId/CounterModel";
import { CounterRepo } from "../../../feature/counter/domain/Counter.repo";

export class MongoCounterRepo extends CounterRepo {
  constructor(private connection: Connection, private entityName: string) {
    super();
  }

  async getCurrentCount(): Promise<number> {
    const counter = await this.connection
      .model("counter", CounterSchema)
      .findOne({ collectionName: this.entityName });

    if (!counter) {
      await this.connection.model("counter", CounterSchema).create({
        collectionName: this.entityName,
        count: 0,
      });

      return 0;
    }

    return counter.count;
  }

  async incrementAndGet(): Promise<number> {
    const counter = await this.connection
      .model("counter", CounterSchema)
      .findOneAndUpdate(
        { collectionName: this.entityName },
        { $inc: { count: 1 } },
        { new: true }
      );

    if (!counter) {
      await this.connection.model("counter", CounterSchema).create({
        collectionName: this.entityName,
        count: 1,
      });

      return 1;
    }

    return counter.count;
  }

  async incrementByValue(value: number): Promise<void> {
    await this.connection
      .model("counter", CounterSchema)
      .findOneAndUpdate(
        { collectionName: this.entityName },
        { $inc: { count: value } }
      );
  }
}
