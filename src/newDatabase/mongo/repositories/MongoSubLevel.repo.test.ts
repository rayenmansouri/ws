import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { SubLevel } from "../../../feature/subLevels/domains/subLevel.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoSubLevelSchema } from "../schemas/subLevel.schema";
import { MongoSubLevelRepo } from "./MongoSubLevel.repo";

describe("Mongo Sub Level repo", () => {
  let connection: Connection;
  let subLevelModel: Model<SubLevel>;
  let subLevelRepo: MongoSubLevelRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    subLevelModel = connection.model<SubLevel>("subLevel", mongoSubLevelSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    subLevelRepo = new MongoSubLevelRepo(connection, null);
  });

  describe("Update Term", () => {
    it("Should Update term nested in multiple subLevels", async () => {
      const termId = faker.database.mongodbObjectId() as ID;

      const schoolYears = await subLevelModel.insertMany([
        {
          level: { currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00001" }] } },
        },
        {
          level: { currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00002" }] } },
        },
        {
          level: {
            currentSchoolYear: {
              terms: [{ name: "term3", _id: faker.database.mongodbObjectId(), newId: "00003" }],
            },
          },
        },
      ]);

      const newTermName = "newTermName";

      await subLevelRepo.updateTerm(termId, { name: newTermName });

      const updatedSchoolYears = await subLevelModel.find({
        _id: { $in: [schoolYears[0]._id, schoolYears[1]._id, schoolYears[2]._id] },
      });

      expect(updatedSchoolYears[0]?.level.currentSchoolYear.terms[0].name).toBe(newTermName);
      expect(updatedSchoolYears[1]?.level.currentSchoolYear.terms[0].name).toBe(newTermName);
      expect(updatedSchoolYears[2]?.level.currentSchoolYear.terms[0].name).not.toBe(newTermName);
    });

    it("Should not Update any term in the subLevel", async () => {
      const termId = faker.database.mongodbObjectId() as ID;
      const termId2 = faker.database.mongodbObjectId() as ID;
      const schoolYear = (
        await subLevelModel.create({
          level: { currentSchoolYear: { terms: [{ _id: termId, name: "term1", newId: "00001" }] } },
        })
      ).toObject();

      const newTermName = "newTermName";

      await subLevelRepo.updateTerm(termId2, { name: newTermName });

      const updatedSchoolYear = await subLevelModel.findById(schoolYear._id);

      expect(updatedSchoolYear?.level.currentSchoolYear?.terms[0].name).not.toBe(newTermName);
    });
  });
});
