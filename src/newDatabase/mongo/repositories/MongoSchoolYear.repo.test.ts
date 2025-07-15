import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { SchoolYear } from "../../../feature/schoolYears/domain/schoolYear.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoSchoolYearSchema } from "../schemas/schoolYear.schema";
import { MongoSchoolYearRepo } from "./MongoSchoolYear.repo";

describe("Mongo School Year repo", () => {
  let connection: Connection;
  let schoolYearModel: Model<SchoolYear>;
  let schoolYearRepo: MongoSchoolYearRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    schoolYearModel = connection.model<SchoolYear>("schoolYear", mongoSchoolYearSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    schoolYearRepo = new MongoSchoolYearRepo(connection, null);
  });

  describe("Update Term", () => {
    it("Should Update term nested in multiple school years", async () => {
      const termId = faker.database.mongodbObjectId() as ID;

      const schoolYears = await schoolYearModel.insertMany([
        { terms: [{ _id: termId, name: "term1", newId: "00001" }] },
        { terms: [{ _id: termId, name: "term1", newId: "00002" }] },
        { terms: [{ name: "term3", _id: faker.database.mongodbObjectId(), newId: "00003" }] },
      ]);

      const newTermName = "newTermName";

      await schoolYearRepo.updateTerm(termId, { name: newTermName });

      const updatedSchoolYears = await schoolYearModel.find({
        _id: { $in: [schoolYears[0]._id, schoolYears[1]._id, schoolYears[2]._id] },
      });

      expect(updatedSchoolYears[0]?.terms[0].name).toBe(newTermName);
      expect(updatedSchoolYears[1]?.terms[0].name).toBe(newTermName);
      expect(updatedSchoolYears[2]?.terms[0].name).not.toBe(newTermName);
    });

    it("Should not Update any term in the school year", async () => {
      const termId = faker.database.mongodbObjectId() as ID;
      const termId2 = faker.database.mongodbObjectId() as ID;

      const schoolYear = (
        await schoolYearModel.create({
          terms: [{ _id: termId, name: "term1", newId: "00001" }],
        })
      ).toObject();

      const newTermName = "newTermName";

      await schoolYearRepo.updateTerm(termId2, { name: newTermName });

      const updatedSchoolYear = await schoolYearModel.findById(schoolYear._id);

      expect(updatedSchoolYear?.terms[0].name).not.toBe(newTermName);
    });
  });

  describe("Find One By Term", () => {
    it("Should get the Term", async () => {
      const termId = faker.database.mongodbObjectId() as ID;

      await schoolYearModel.insertMany([
        { terms: [{ _id: termId, name: "term1", newId: "00001" }] },
      ]);

      const schoolYear = await schoolYearRepo.findOneByTerm(termId);

      expect(schoolYear).toBeTruthy();
      expect(schoolYear?.terms[0]._id).toEqual(termId);
    });

    it("Should return null when given term id not nested in any schoolYear ", async () => {
      const termId = faker.database.mongodbObjectId() as ID;
      const termId2 = faker.database.mongodbObjectId() as ID;

      await schoolYearModel.insertMany([
        { terms: [{ _id: termId, name: "term1", newId: "00001" }] },
      ]);

      const schoolYear = await schoolYearRepo.findOneByTerm(termId2);

      expect(schoolYear).not.toBeTruthy();
      expect(schoolYear?.terms[0]._id).not.toEqual(termId);
    });
  });
});
