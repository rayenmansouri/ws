import { CounterRepo } from "../feature/counter/counter.repo";
import { BaseEntity, ID } from "../types/BaseEntity";
import { BaseRepo } from "./BaseRepo";
import { GenerateMetaData } from "./populateTypes";
import { BadRequestError, NotFoundError } from "./ApplicationErrors";

type TestEntity = {
  name: string;
} & BaseEntity;

type TestEntityMetaData = GenerateMetaData<TestEntity, never>;

describe("Base repo", () => {
  let baseRepo: BaseRepo<{ entity: TestEntity; populatedFields: TestEntityMetaData }>;
  let mockFindOneByNewId: jest.Mock;
  let mockFindOneById: jest.Mock;
  let mockFindManyByNewIds: jest.Mock;
  let mockFindManyByIds: jest.Mock;
  let mockBaseAddOne: jest.Mock;
  let mockBaseAddMany: jest.Mock;
  let mockFindOneByField: jest.Mock;
  let mockGetCurrentCount: jest.Mock;
  let mockIncrementAndGet: jest.Mock;
  let mockIncrementByValue: jest.Mock;
  let baseUpdateManyByNewId: jest.Mock;
  let baseUpdateOneByNewId: jest.Mock;
  let getRandomId: jest.Mock;

  beforeEach(() => {
    mockFindOneByNewId = jest.fn();
    mockFindOneById = jest.fn();
    mockFindManyByNewIds = jest.fn();
    mockFindManyByIds = jest.fn();
    mockBaseAddOne = jest.fn();
    mockBaseAddMany = jest.fn();
    mockFindOneByField = jest.fn();
    mockGetCurrentCount = jest.fn();
    mockIncrementAndGet = jest.fn();
    mockIncrementByValue = jest.fn();
    baseUpdateManyByNewId = jest.fn();
    baseUpdateOneByNewId = jest.fn();
    getRandomId = jest.fn();

    class MockCounterRepo extends CounterRepo {
      incrementAndGet = mockIncrementAndGet;
      incrementByValue = mockIncrementByValue;
      getCurrentCount = mockGetCurrentCount;
    }

    class TestBaseRepo extends BaseRepo<TestEntityMetaData> {
      getRandomId = getRandomId;
      protected baseUpdateOneByNewId = baseUpdateOneByNewId;
      protected baseUpdateManyByNewIds = baseUpdateManyByNewId;
      findOneByNewId = mockFindOneByNewId;
      findOneById = mockFindOneById;
      findManyByNewIds = mockFindManyByNewIds;
      findManyByIds = mockFindManyByIds;
      findAll = jest.fn();
      protected baseAddOne = mockBaseAddOne;
      protected findOneByField = mockFindOneByField;
      protected baseAddMany = mockBaseAddMany;
      protected baseUpdateOneById = jest.fn();
      protected baseUpdateManyByIds = jest.fn();
      deleteManyByIds = jest.fn();
      deleteManyByNewIds = jest.fn();
      deleteOneById = jest.fn();
      deleteOneByNewId = jest.fn();
    }

    const counterRepo = new MockCounterRepo();
    baseRepo = new TestBaseRepo(counterRepo);
  });

  describe("findOneByNewIdOrThrow", () => {
    it("Should throw error when the entity is null", async () => {
      mockFindOneByNewId.mockReturnValue(null);

      try {
        await baseRepo.findOneByNewIdOrThrow("00001", "notFound.user");
        fail("it should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it("Should return the entity when is not null", async () => {
      const testEntity = { name: "hello" };
      mockFindOneByNewId.mockReturnValue(testEntity);

      const entity = await baseRepo.findOneByNewIdOrThrow("00001", "notFound.user");
      expect(entity).toEqual(testEntity);
    });
  });

  describe("findOneByIdOrThrow", () => {
    it("Should throw error when the entity is null", async () => {
      mockFindOneById.mockReturnValue(null);

      try {
        await baseRepo.findOneByIdOrThrow("00001" as ID, "notFound.user");
        fail("it should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it("Should return the entity when is not null", async () => {
      const testEntity = { name: "hello" };
      mockFindOneById.mockReturnValue(testEntity);

      const entity = await baseRepo.findOneByIdOrThrow("00001" as ID, "notFound.user");
      expect(entity).toEqual(testEntity);
    });
  });

  describe("findManyByIdsOrThrow", () => {
    it("Should throw error when at least one entity doesn't exist", async () => {
      mockFindManyByIds.mockReturnValue(["1", "2"]);

      try {
        await baseRepo.findManyByIdsOrThrow(["id1", "id2", "id3"] as ID[], "notFound.classType");
        fail("It should throw error");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it("Should return the entities when they are all found", async () => {
      mockFindManyByIds.mockReturnValue(["1", "2"]);

      const entities = await baseRepo.findManyByIdsOrThrow(
        ["id1", "id2"] as ID[],
        "alreadyUsed.email",
      );

      expect(entities).toEqual(["1", "2"]);
    });
  });

  describe("findManyNewIdsOrThrow", () => {
    it("Should throw error when at least one entity doesn't exist", async () => {
      mockFindManyByNewIds.mockReturnValue(["1", "2"]);

      try {
        await baseRepo.findManyByNewIdsOrThrow(
          ["newId1", "newId2", "newId3"],
          "notFound.classType",
        );
        fail("It should throw error");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(NotFoundError);
      }
    });

    it("Should return the entities when they are all found", async () => {
      mockFindManyByNewIds.mockReturnValue(["1", "2"]);

      const entities = await baseRepo.findManyByNewIdsOrThrow(
        ["newId1", "newId2"],
        "alreadyUsed.email",
      );

      expect(entities).toEqual(["1", "2"]);
    });
  });

  describe("addOne", () => {
    it("Should call the baseAddOne method with the base entity fields and the payload", async () => {
      mockIncrementAndGet.mockReturnValue("00003");

      let addOnePayload = {} as BaseEntity;
      mockBaseAddOne.mockImplementationOnce(payload => {
        addOnePayload = payload;
      });

      await baseRepo.addOne({ name: "name" });

      expect(mockBaseAddOne).toHaveBeenCalled();
      expect(addOnePayload.newId).toBe("00003");
      expect(addOnePayload.createdAt).toBeInstanceOf(Date);
      expect(addOnePayload.updatedAt).toBeInstanceOf(Date);
    });

    it("Should return the created entity", async () => {
      mockIncrementAndGet.mockReturnValue(3);
      mockBaseAddOne.mockReturnValue({ name: "hello" });

      const entity = await baseRepo.addOne({ name: "hello" });

      expect(entity).toEqual({ name: "hello" });
    });
  });

  describe("addMany", () => {
    it("Should call the baseAddMany method with the base entity fields and the payload", async () => {
      mockGetCurrentCount.mockReturnValue(2);

      await baseRepo.addMany([{ name: "name" }, { name: "name2" }]);

      expect(mockBaseAddMany).toHaveBeenCalledWith([
        {
          name: "name",
          newId: "00003",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          name: "name2",
          newId: "00004",
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });

    it("Should increment the counter by the number of entities added", async () => {
      mockGetCurrentCount.mockReturnValue(3);

      await baseRepo.addMany([{ name: "name" }, { name: "name2" }]);

      expect(mockIncrementByValue).toHaveBeenCalledWith(2);
    });
  });

  describe("ensureFieldUniqueness", () => {
    it("Should throw error when an entity has the same value for the same field", async () => {
      mockFindOneByField.mockReturnValue({ name: "hey" });

      try {
        await baseRepo.ensureFieldUniqueness("name", "hey", "alreadyUsed.name");
        fail("It should fail");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw error when no entity exist with the same value", async () => {
      mockFindOneByField.mockReturnValue(null);

      await expect(
        baseRepo.ensureFieldUniqueness("name", "hey", "alreadyUsed.name"),
      ).resolves.not.toThrow();
    });
  });
});
