import { Connection, Model } from "mongoose";
import { CounterSchema, ICounterSchema } from "../../../core/newId/CounterModel";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { MongoCounterRepo } from "./MongoCounter.repo";

describe("Mongo counter", () => {
  let counterModel: Model<ICounterSchema>;
  let connection: Connection;
  beforeAll(() => {
    connection = createRandomMongoConnection();
    counterModel = connection.model("counter", CounterSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  afterEach(async () => {
    await counterModel.deleteMany({});
  });

  describe("getCurrentCount", () => {
    it("Should return the current count", async () => {
      const currentCount = 12;
      counterModel.create({ collectionName: "testCollection", count: currentCount });

      const mongoCounter = new MongoCounterRepo(connection, "testCollection");

      const count = await mongoCounter.getCurrentCount();

      expect(count).toBe(currentCount);
    });

    it("should create the counter and return 0 when no counter exists", async () => {
      const mongoCounter = new MongoCounterRepo(connection, "testCollection");

      const count = await mongoCounter.getCurrentCount();

      const studentCounter = await counterModel.findOne({ collectionName: "testCollection" });

      expect(count).toBe(0);
      expect(studentCounter).toBeTruthy();
      expect(studentCounter?.count).toBe(0);
    });
  });

  describe("incrementAndGet", () => {
    it("Should increment and return the counter", async () => {
      counterModel.create({ collectionName: "testCollection", count: 1 });

      const mongoCounter = new MongoCounterRepo(connection, "testCollection");

      const newId = await mongoCounter.incrementAndGet();

      const studentCounter = await counterModel.findOne({ collectionName: "testCollection" });

      expect(newId).toBe(2);
      expect(studentCounter?.count).toBe(2);
    });

    it("Should create the counter and set the count to 1 when no counter exists", async () => {
      const mongoCounter = new MongoCounterRepo(connection, "testCollection");

      const newId = await mongoCounter.incrementAndGet();

      const parentCounter = await counterModel.findOne({ collectionName: "testCollection" });

      expect(newId).toBe(1);
      expect(parentCounter).toBeTruthy();
      expect(parentCounter?.count).toBe(1);
    });
  });

  describe("incrementByValue", () => {
    it("Should increment the counter by the value", async () => {
      counterModel.create({ collectionName: "testCollection", count: 1 });

      const mongoCounter = new MongoCounterRepo(connection, "testCollection");

      await mongoCounter.incrementByValue(5);

      const studentCounter = await counterModel.findOne({ collectionName: "testCollection" });

      expect(studentCounter?.count).toBe(6);
    });
  });
});
