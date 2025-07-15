import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { CentralUserRepo } from "./CentralUser.repo";

describe("Central User Repo", () => {
  let centralUserRepo: CentralUserRepo;
  let mockFindOneByEmail: jest.Mock;
  let mockFindOneByPhoneNumber: jest.Mock;
  let mockFindByAnyIdentifier: jest.Mock;
  let mockAddOne: jest.Mock;

  beforeEach(() => {
    mockFindOneByEmail = jest.fn();
    mockFindOneByPhoneNumber = jest.fn();
    mockAddOne = jest.fn();
    mockFindByAnyIdentifier = jest.fn();

    class TestCentralUserRepo extends CentralUserRepo {
      findByAnyIdentifier = mockFindByAnyIdentifier;
      findOneByEmail = mockFindOneByEmail;
      findOneByPhoneNumber = mockFindOneByPhoneNumber;
      addOne = mockAddOne;
      updateOne = jest.fn();
      addMany = jest.fn();
    }

    centralUserRepo = new TestCentralUserRepo(null);
  });

  describe("ensureEmailUniquenessOnAdd", () => {
    it("Should throw error if user with same email exist", async () => {
      mockFindOneByEmail.mockReturnValue({ email: "email" });

      try {
        await centralUserRepo.ensureEmailUniquenessOnAdd("email", "admin");
        fail("it should fail");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw when no user exist with the same email", async () => {
      mockFindOneByEmail.mockReturnValue(null);

      await expect(
        centralUserRepo.ensureEmailUniquenessOnAdd("email", "admin"),
      ).resolves.not.toThrow();
    });
  });

  describe("ensurePhoneUniquenessOnAdd", () => {
    it("Should throw error if user with same phone exist", async () => {
      mockFindOneByPhoneNumber.mockReturnValue({ phone: "phone" });

      try {
        await centralUserRepo.ensurePhoneUniquenessOnAdd("phone", "admin");
        fail("it should fail");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw when no user exist with the same phone", async () => {
      mockFindOneByPhoneNumber.mockReturnValue(null);

      await expect(
        centralUserRepo.ensurePhoneUniquenessOnAdd("email", "admin"),
      ).resolves.not.toThrow();
    });
  });

  describe("ensureEmailUniquenessOnUpdate", () => {
    it("Should throw error if user exists with the same email and userId is different", async () => {
      mockFindOneByEmail.mockReturnValue({ userId: "id1" });

      try {
        await centralUserRepo.ensureEmailUniquenessOnUpdate("email", "id2" as ID, "admin");
        fail("It should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw error if user exists with the same email and same userId", async () => {
      mockFindOneByEmail.mockReturnValue({ userId: "id1" });

      await expect(
        centralUserRepo.ensureEmailUniquenessOnUpdate("email", "id1" as ID, "admin"),
      ).resolves.not.toThrow();
    });

    it("Should not throw error if no user exists with the same email", async () => {
      mockFindOneByEmail.mockReturnValue(null);

      await expect(
        centralUserRepo.ensureEmailUniquenessOnUpdate("email", "id1" as ID, "admin"),
      ).resolves.not.toThrow();
    });
  });

  describe("ensurePhoneUniquenessOnUpdate", () => {
    it("Should throw error if user exists with the same phone and userId is different", async () => {
      mockFindOneByPhoneNumber.mockReturnValue({ userId: "id1" });

      try {
        await centralUserRepo.ensurePhoneUniquenessOnUpdate("phone", "id2" as ID, "admin");
        fail("It should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw error if user exists with the same phone and same userId", async () => {
      mockFindOneByPhoneNumber.mockReturnValue({ userId: "id1" });

      await expect(
        centralUserRepo.ensurePhoneUniquenessOnUpdate("phone", "id1" as ID, "admin"),
      ).resolves.not.toThrow();
    });

    it("Should not throw error if no user exists with the same phone", async () => {
      mockFindOneByPhoneNumber.mockReturnValue(null);

      await expect(
        centralUserRepo.ensurePhoneUniquenessOnUpdate("phone", "id1" as ID, "admin"),
      ).resolves.not.toThrow();
    });
  });
});
