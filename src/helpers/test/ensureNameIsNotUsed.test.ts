import { BadRequestError } from "../../core/ApplicationErrors";
import { crudRepo } from "../../database/repositories/crud.repo";
import { ensureNameIsNotUsed } from "../ensureNameIsNotUsed";
import {
  SchoolDetails,
  createRandomSchoolConnection,
} from "../testHelper/createRandomSchoolConnection";
import { connectToMongoMemoryServer } from "../testHelper/mongoMemoryServer";

describe("ensureNameIsNotUsed test cases:", () => {
  connectToMongoMemoryServer();

  let schoolDetails: SchoolDetails;

  beforeEach(async () => {
    schoolDetails = await createRandomSchoolConnection();
  });

  it("should throw error when the given name is used", async () => {
    const ENTITY = "term";
    const USED_NAME = "name";

    await crudRepo(schoolDetails.connection, ENTITY).addOne({
      name: USED_NAME,
    });

    await expect(
      ensureNameIsNotUsed(schoolDetails.connection, ENTITY, USED_NAME),
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("should not throw error when name is not used", async () => {
    const ENTITY = "term";
    const NAME = "name";

    await expect(
      ensureNameIsNotUsed(schoolDetails.connection, ENTITY, NAME),
    ).resolves.not.toThrow();
  });

  it("Should not throw error when the name is used by the given newId", async () => {
    const ENTITY = "term";
    const USED_NAME = "name";

    const entity = await crudRepo(schoolDetails.connection, ENTITY).addOne({
      name: USED_NAME,
    });

    await expect(
      ensureNameIsNotUsed(schoolDetails.connection, ENTITY, USED_NAME, entity.newId),
    ).resolves.not.toThrow();
  });
});
