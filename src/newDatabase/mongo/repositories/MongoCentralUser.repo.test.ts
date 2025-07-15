import { Connection, Model } from "mongoose";
import { createRandomMongoConnection } from "../../../helpers/testHelper/mongoMemoryServer";
import { mongoCentralUserSchema } from "../schemas/centralUser.schema";
import { MongoCentralUserRepo } from "./MongoCentralUser.repo";
import { faker } from "@faker-js/faker";
import { CentralUser } from "../../../feature/users/domain/centralUser.entity";
import { ID } from "../../../types/BaseEntity";

describe("Mongo central user repo", () => {
  let centralRepo: MongoCentralUserRepo;
  let connection: Connection;
  let adminModel: Model<CentralUser>;

  beforeAll(() => {
    connection = createRandomMongoConnection();
    adminModel = connection.model<CentralUser>("admin", mongoCentralUserSchema);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  beforeEach(async () => {
    class TestMongoCentralUserRepo extends MongoCentralUserRepo {
      protected connection = connection;
    }

    centralRepo = new TestMongoCentralUserRepo(null);

    await adminModel.deleteMany({});
  });

  describe("addOne", () => {
    it("Should create the central user in the right collection", async () => {
      await centralRepo.addOne(
        {
          tenantId: "tenant",
          newId: "tenant.00001",
          userId: "userId1" as ID,
          email: "hey",
        },
        "admin",
      );

      const entity = await adminModel.findOne({ userId: "userId1" });

      expect(entity).not.toBeNull();
    });

    it("Should return the central user", async () => {
      const centralUser = {
        _id: faker.database.mongodbObjectId(),
        newId: "tenant.00001",
        tenantId: "tenant",
        userId: "userId2" as ID,
        email: "hey",
      };

      const createdCentralUser = await centralRepo.addOne(centralUser, "admin");

      expect(createdCentralUser).toEqual(centralUser);
    });
  });

  describe("updateOne", () => {
    it("should update the central user email and phone number", async () => {
      await adminModel.create({
        tenantId: "tenant1",
        userId: "admin1" as ID,
        email: "email1",
        phoneNumber: "phone1",
      });

      await centralRepo.updateOne(
        { tenantId: "tenant1", userId: "admin1", email: "email2", phoneNumber: "phone2" },
        "admin",
      );

      const updatedCentralUser = await adminModel.findOne({ userId: "admin1" });

      expect(updatedCentralUser).toEqual({
        _id: expect.any(String),
        tenantId: "tenant1",
        userId: "admin1",
        email: "email2",
        phoneNumber: "phone2",
      });
    });

    it("Should delete the email or the phone number if they are null", async () => {
      await adminModel.create({
        tenantId: "tenant1",
        userId: "admin1",
        email: "email1",
        phoneNumber: "phone1",
      });

      await centralRepo.updateOne(
        { tenantId: "tenant1", userId: "admin1", email: null, phoneNumber: null },
        "admin",
      );

      const updatedCentralUser = await adminModel.findOne({ userId: "admin1" });

      expect(updatedCentralUser).toEqual({
        _id: expect.any(String),
        tenantId: "tenant1",
        userId: "admin1",
      });
    });
  });

  describe("findOneByEmail", () => {
    it("Should return the central user if it exist with the same email", async () => {
      const email = "email@exist.com";

      const centralUser = {
        _id: faker.database.mongodbObjectId(),
        tenantId: "tenant",
        userId: "userId2",
        email,
      };

      await adminModel.create(centralUser);

      const foundCentralUser = await centralRepo.findOneByEmail(email, "admin");

      expect(foundCentralUser).toEqual(centralUser);
    });

    it("Should not return a central user if it doesn't exist", async () => {
      const email = "email@notFound.com";

      const centralUser = await centralRepo.findOneByEmail(email, "admin");

      expect(centralUser).toBeNull();
    });
  });

  describe("findOneByPhoneNumber", () => {
    it("Should return the central user if it exist with the same phone number", async () => {
      const phoneNumber = "29123012";

      const centralUser = {
        _id: faker.database.mongodbObjectId(),
        tenantId: "tenant",
        userId: "userId2",
        phoneNumber,
      };

      await adminModel.create(centralUser);

      const foundCentralUser = await centralRepo.findOneByPhoneNumber(phoneNumber, "admin");

      expect(foundCentralUser).toEqual(centralUser);
    });

    it("Should not return a central user if it doesn't exist", async () => {
      const phoneNumber = "notFound";

      const centralUser = await centralRepo.findOneByPhoneNumber(phoneNumber, "admin");

      expect(centralUser).toBeNull();
    });
  });
});
