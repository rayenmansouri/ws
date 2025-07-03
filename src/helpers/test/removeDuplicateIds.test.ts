import { intersection } from "lodash";
import { objectIdArrayToString } from "../functionsUtils";
import { removeDuplicateIds } from "../removeDuplicateId";
import { createIds } from "../testHelper/createIds";

describe("removeDuplicateIds", () => {
  it("should return the array as it is when no id is duplicated", () => {
    const oldArrayIds = createIds(3);

    const newArrayIds = removeDuplicateIds(oldArrayIds);

    expect(newArrayIds.length === 3).toBe(true);

    expect(
      intersection(objectIdArrayToString(newArrayIds), objectIdArrayToString(oldArrayIds)).length,
    ).toBe(3);
  });

  it("should remove duplication in the array when some ids are duplicated", () => {
    const [id1] = createIds(3);

    const newArrayIds = removeDuplicateIds([id1, id1, id1, id1]);

    expect(newArrayIds.length === 1).toBe(true);
  });
});
