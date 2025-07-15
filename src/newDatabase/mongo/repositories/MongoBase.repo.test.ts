import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { Level, LevelMetaData } from "../../../feature/levels/domains/level.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { MongoBaseRepo } from "./MongoBase.repo";
import { mongoLevelSchema } from "../schemas/level.schema";

class TestMongoRepo extends MongoBaseRepo<LevelMetaData> {
  public exposedBaseAddOne = this.baseAddOne;
  public exposedBaseAddMany = this.baseAddMany;
  public exposedUpdateOneById = this.baseUpdateOneById;
  public exposedUpdateOneByNewId = this.baseUpdateOneByNewId;
  public exposedUpdateManyByNewIds = this.baseUpdateManyByNewIds;
  public exposedFindOneByField = this.findOneByField;
}

describe("Mongo Base repo", () => {
  let connection: Connection;
  let mongoRepo: TestMongoRepo;
  let testModel: Model<Level>;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    testModel = connection.model<Level>("level", mongoLevelSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(async () => {
    mongoRepo = new TestMongoRepo(connection, "level", null);
    await connection.model("level", mongoLevelSchema).deleteMany({});
  });

  describe("findOneByNewId", () => {
    it("Should return the entity when it exists", async () => {
      const newId = "00001";
      const createdEntity = (await testModel.create({ newId })).toObject();

      const foundEntity = await mongoRepo.findOneByNewId(newId);

      expect(foundEntity).toEqual(createdEntity);
    });

    it("Should return null when it doesn't exist", async () => {
      const foundEntity = await mongoRepo.findOneByNewId("404");

      expect(foundEntity).toBeNull();
    });
  });

  describe("findManyByNewIds", () => {
    it("Should return the entities when they exists", async () => {
      const newIds = ["00002", "00003"];

      const createdEntities = (
        await testModel.insertMany([{ newId: newIds[0] }, { newId: newIds[1] }])
      ).map(item => item.toObject());

      const foundEntities = await mongoRepo.findManyByNewIds(newIds);

      expect(foundEntities).toEqual(createdEntities);
    });
  });

  describe("findOneById", () => {
    it("Should return the entity when it exists", async () => {
      const createdEntity = (await testModel.create({})).toObject();

      const foundEntity = await mongoRepo.findOneById(createdEntity._id.toString());

      expect(foundEntity).toEqual(createdEntity);
    });

    it("Should return null when it doesn't exist", async () => {
      const fakeID = faker.database.mongodbObjectId();
      const foundEntity = await mongoRepo.findOneById(fakeID);

      expect(foundEntity).toBeNull();
    });
  });

  describe("findManyByIds", () => {
    it("Should return the entities when they exists", async () => {
      const createdEntities = (await testModel.insertMany([{}, {}])).map(item => item.toObject());

      const ids = createdEntities.map(entity => entity._id);

      const foundEntities = await mongoRepo.findManyByIds(ids);

      expect(foundEntities).toEqual(createdEntities);
    });
  });

  describe("baseAddOne", () => {
    it("Should return the created object", async () => {
      const createdEntity = await mongoRepo.exposedBaseAddOne({
        name: "level",
      } as Level);

      expect({ ...createdEntity }.name).toBe("level");
    });
  });

  describe("baseAddMany", () => {
    it("Should create multiple entities", async () => {
      const entities = [{ name: "level 1" }, { name: "level 2" }] as Level[];

      await mongoRepo.exposedBaseAddMany(entities);

      const foundEntities = await testModel.find();

      expect(foundEntities).toHaveLength(2);
    });
  });

  describe("baseUpdateOneById", () => {
    it("Should update the entity", async () => {
      const createdEntity = (await testModel.create({ name: "level" })).toObject();

      await mongoRepo.exposedUpdateOneById(createdEntity._id.toString(), {
        name: "updated level",
      });

      const updatedEntity = await testModel.findById(createdEntity._id);

      expect(updatedEntity?.name).toBe("updated level");
    });
  });

  describe("findOneByField", () => {
    it("Should return the entity if it exists", async () => {
      const color = "red";
      const createdEntity = (await testModel.create({ color })).toObject();

      const foundEntity = await mongoRepo.exposedFindOneByField("color", color);

      expect(foundEntity).toEqual(createdEntity);
    });

    it("Should return null if it doesn't exist", async () => {
      const color = "doesn't exist";

      const foundEntity = await mongoRepo.exposedFindOneByField("color", color);

      expect(foundEntity).toBeNull();
    });
  });

  describe("Update One By NewId", () => {
    it("Should update the entity", async () => {
      const createdEntity = (await testModel.create({ name: "level", newId: "123" })).toObject();

      await mongoRepo.exposedUpdateOneByNewId(createdEntity.newId, {
        name: "updated level",
      });
      const updatedEntity = await testModel.findOne({ newId: createdEntity.newId });
      expect(updatedEntity?.name).toBe("updated level");
    });
  });

  describe("Update Many By NewIds", () => {
    it("Should update all the entities", async () => {
      const createdEntities = (
        await testModel.insertMany([
          { name: "Level1", newId: "1" },
          { name: "Level2", newId: "2" },
        ])
      ).map(doc => doc.toObject());

      const newIds = createdEntities.map(doc => doc.newId);
      await mongoRepo.exposedUpdateManyByNewIds(
        createdEntities.map(doc => doc.newId),
        { name: "updated level" },
      );

      const updatedEntities = (await testModel.find({ newId: { $in: newIds } })).map(doc => doc);

      expect(updatedEntities.every(doc => doc.name === "updated level")).toBe(true);
    });

    it("Should modify one entity and ensure the other remains unaffected.", async () => {
      await testModel.insertMany([
        { name: "Level1", newId: "1" },
        { name: "Level2", newId: "2" },
      ]);

      await mongoRepo.exposedUpdateManyByNewIds(["2"], { name: "updated level" });

      const updatedEntities = (await testModel.find({ newId: { $in: ["2"] } })).map(doc => doc);
      const nonUpdatedEntities = (await testModel.find({ newId: { $in: ["1"] } })).map(doc => doc);

      expect(updatedEntities.every(doc => doc.name === "updated level")).toBe(true);
      expect(nonUpdatedEntities.every(doc => doc.name === "Level1")).toBe(true);
    });
  });
});
