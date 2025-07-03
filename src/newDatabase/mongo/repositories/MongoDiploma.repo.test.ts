import { Connection, Model } from "mongoose";
import { Diploma } from "../../../feature/diploma/diploma.entity";
import { cleanupConnection } from "../../../helpers/test/cleanupConnection";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { mongoDiplomaSchema } from "../schemas/diploma.schema";
import { MongoDiplomaRepo } from "./MongoDiploma.repo";

describe("Mongo Diploma", () => {
  let diplomaModel: Model<Diploma>;
  let connection: Connection;
  beforeAll(() => {
    connection = createRandomMongoConnection();
    diplomaModel = connection.model("diploma", mongoDiplomaSchema);
  });

  afterEach(async () => {
    await diplomaModel.deleteMany({});
  });

  afterAll(async () => {
    await cleanupConnection(connection);
  });

  describe("findOneByAverageBounds", () => {
    it("Should return diploma with in that range", async () => {
      const diploma = (
        await diplomaModel.create({ name: "TEST", minAverage: 1, maxAverage: 6 })
      ).toObject();

      const mongoDiploma = new MongoDiplomaRepo(connection, null);

      expect(await mongoDiploma.findOneByAverageBounds(1, 7)).toMatchObject(diploma);
      expect(await mongoDiploma.findOneByAverageBounds(0, 5)).toMatchObject(diploma);
      expect(await mongoDiploma.findOneByAverageBounds(2, 3)).toMatchObject(diploma);
    });

    it("Should NOT return diploma with in that range", async () => {
      await diplomaModel.create({ name: "TEST", minAverage: 1, maxAverage: 6 });

      const mongoDiploma = new MongoDiplomaRepo(connection, null);

      expect(await mongoDiploma.findOneByAverageBounds(6.01, 7)).toBe(null);
      expect(await mongoDiploma.findOneByAverageBounds(0, 0.5)).toBe(null);
    });
  });

  describe("findOneByAverage", () => {
    it("Should return diploma by average", async () => {
      const diploma = (
        await diplomaModel.create({ name: "TEST", minAverage: 1, maxAverage: 6 })
      ).toObject();

      const mongoDiploma = new MongoDiplomaRepo(connection, null);

      expect(await mongoDiploma.findOneByAverage(1)).toMatchObject(diploma);
      expect(await mongoDiploma.findOneByAverage(5)).toMatchObject(diploma);
      expect(await mongoDiploma.findOneByAverage(6)).toMatchObject(diploma);
    });

    it("Should NOT return diploma by average", async () => {
      await diplomaModel.create({ name: "TEST", minAverage: 1, maxAverage: 6 });

      const mongoDiploma = new MongoDiplomaRepo(connection, null);

      expect(await mongoDiploma.findOneByAverage(0)).toBe(null);
      expect(await mongoDiploma.findOneByAverage(0.99)).toBe(null);
      expect(await mongoDiploma.findOneByAverage(6.1)).toBe(null);
    });
  });
});
