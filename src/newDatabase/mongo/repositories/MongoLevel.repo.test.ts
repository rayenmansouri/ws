import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { Level } from "../../../feature/levels/domains/level.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoLevelSchema } from "../schemas/level.schema";
import { MongoLevelRepo } from "./MongoLevel.repo";

describe("Mongo Level repo", () => {
  let connection: Connection;
  let levelModel: Model<Level>;
  let levelRepo: MongoLevelRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    levelModel = connection.model<Level>("level", mongoLevelSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    levelRepo = new MongoLevelRepo(connection, null);
  });

  describe("Update Term", () => {
    it("Should Update term nested in multiple levels", async () => {
      const termId = faker.database.mongodbObjectId() as ID;

      const levels = await levelModel.insertMany([
        { currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00001" }] } },
        { currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00002" }] } },
        {
          currentSchoolYear: {
            terms: [{ name: "term3", _id: faker.database.mongodbObjectId(), newId: "00003" }],
          },
        },
      ]);

      const newTermName = "newTermName";

      await levelRepo.updateTerm(termId, { name: newTermName });

      const updatedLevels = await levelModel.find({
        _id: { $in: [levels[0]._id, levels[1]._id, levels[2]._id] },
      });

      expect(updatedLevels[0]?.currentSchoolYear.terms[0].name).toBe(newTermName);
      expect(updatedLevels[1]?.currentSchoolYear.terms[0].name).toBe(newTermName);
      expect(updatedLevels[2]?.currentSchoolYear.terms[0].name).not.toBe(newTermName);
    });

    it("Should not Update any term in the Level", async () => {
      const termId = faker.database.mongodbObjectId() as ID;
      const termId2 = faker.database.mongodbObjectId() as ID;
      const schoolYear = (
        await levelModel.create({
          currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00001" }] },
        })
      ).toObject();

      const newTermName = "newTermName";

      await levelRepo.updateTerm(termId2, { name: newTermName });

      const updatedSchoolYear = await levelModel.findById(schoolYear._id);

      expect(updatedSchoolYear?.currentSchoolYear?.terms[0].name).not.toBe(newTermName);
    });
  });
});
