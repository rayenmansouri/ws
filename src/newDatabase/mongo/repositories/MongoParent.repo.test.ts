import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { Parent } from "../../../feature/parents/domain/parent.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoParentSchema } from "../schemas/parent.schema";
import { MongoParentRepo } from "./MongoParent.repo";

describe("Mongo parent repo", () => {
  let connection: Connection;
  let parentModel: Model<Parent>;
  let parentRepo: MongoParentRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    parentModel = connection.model<Parent>("parent", mongoParentSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    parentRepo = new MongoParentRepo(connection, null);
  });

  describe("addStudentsToParents", () => {
    it("Should add the students to all the parents", async () => {
      const studentId1 = faker.database.mongodbObjectId();
      const studentId2 = faker.database.mongodbObjectId();
      const studentId3 = faker.database.mongodbObjectId();
      const studentId4 = faker.database.mongodbObjectId();

      const parent1 = (await parentModel.create({ students: [] })).toObject();
      const parent2 = (await parentModel.create({ students: [studentId1, studentId2] })).toObject();

      await parentRepo.addStudentsToParents(
        [studentId3 as ID, studentId4 as ID],
        [parent1._id, parent2._id],
      );

      const updatedParent1 = await parentRepo.findOneById(parent1._id);
      const updatedParent2 = await parentRepo.findOneById(parent2._id);

      expect(updatedParent1?.students).toEqual([studentId3, studentId4]);
      expect(updatedParent2?.students).toEqual([studentId1, studentId2, studentId3, studentId4]);
    });

    it("Should not add the students to unrelated parents", async () => {
      const parent = (await parentModel.create({ students: [] })).toObject();

      const fakeParentId = faker.database.mongodbObjectId() as ID;
      const fakeStudentId = faker.database.mongodbObjectId() as ID;

      await parentRepo.addStudentsToParents([fakeStudentId], [fakeParentId]);

      const updatedParent = await parentModel.findOne({ _id: parent._id });

      expect(updatedParent?.students).toEqual([]);
    });
  });
});
