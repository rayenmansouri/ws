import { faker } from "@faker-js/faker";
import { Connection, Model } from "mongoose";
import { Student } from "../../../feature/students/domain/student.entity";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { ID } from "../../../types/BaseEntity";
import { mongoStudentSchema } from "../schemas/student.schema";
import { MongoStudentRepo } from "./MongoStudent.repo";

describe("Mongo student repo", () => {
  let connection: Connection;
  let studentModel: Model<Student>;
  let studentRepo: MongoStudentRepo;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    studentModel = connection.model<Student>("student", mongoStudentSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(() => {
    studentRepo = new MongoStudentRepo(connection, null);
  });

  describe("addParentsToStudents", () => {
    it("Should add the parents to all the students", async () => {
      const parentId1 = faker.database.mongodbObjectId();
      const parentId2 = faker.database.mongodbObjectId();
      const parentId3 = faker.database.mongodbObjectId();
      const parentId4 = faker.database.mongodbObjectId();

      const student1 = (await studentModel.create({ parents: [] })).toObject();
      const student2 = (await studentModel.create({ parents: [parentId1, parentId2] })).toObject();

      await studentRepo.addParentsToStudents(
        [parentId3 as ID, parentId4 as ID],
        [student1._id, student2._id],
      );

      const updatedStudent1 = await studentRepo.findOneById(student1._id);
      const updatedStudent2 = await studentRepo.findOneById(student2._id);

      expect(updatedStudent1?.parents).toEqual([parentId3, parentId4]);
      expect(updatedStudent2?.parents).toEqual([parentId1, parentId2, parentId3, parentId4]);
    });

    it("Should not add the parents to unrelated students", async () => {
      const student = (await studentModel.create({ parents: [] })).toObject();

      const fakeParentId = faker.database.mongodbObjectId() as ID;
      const fakeStudentId = faker.database.mongodbObjectId() as ID;

      await studentRepo.addParentsToStudents([fakeParentId], [fakeStudentId]);

      const updatedStudent = await studentModel.findOne({ _id: student._id });

      expect(updatedStudent?.parents).toEqual([]);
    });
  });
});
