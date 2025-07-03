import { schoolDocStore } from "../../core/subdomainStore";
import { School } from "../../feature/schools/domain/school.entity";
import { createIds } from "../testHelper/createIds";
import { generateUniquePath } from "../upload";

describe("generateUniquePath", () => {
  it("should create path that start with env , schoolSubdomain, the folder name and then the unique string  ", () => {
    const [fakeTenantId] = createIds(1);
    schoolDocStore[fakeTenantId.toString()] = { subdomain: "test" } as School;

    const path = generateUniquePath(
      { originalname: "test" },
      fakeTenantId.toString(),
      "folderName",
    );

    const expectPath = `/test/test/folderName/`;

    expect(path.startsWith(expectPath)).toBe(true);
  });
});
