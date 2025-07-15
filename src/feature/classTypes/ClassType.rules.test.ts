import { Populate } from "../../core/populateTypes";
import { BadRequestError } from "../../core/ApplicationErrors";
import { Level } from "../levels/domains/level.entity";
import { ClassTypeMetaData } from "./repo/classType.entity";
import { ClassTypeRules } from "./ClassType.rules";

describe("Class type rules", () => {
  describe("ensureClassTypeMatchLevel", () => {
    it("Should throw error when the class type doesn't match the level", () => {
      const classType = {
        subLevel: {
          level: {
            _id: "id1",
          },
        },
      } as unknown as Populate<ClassTypeMetaData, "subLevel">;
      const level = {
        _id: "id2",
      } as Level;

      try {
        ClassTypeRules.ensureClassTypeMatchLevel(classType, level);
        fail("It should throw");
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });

    it("Should not throw error when the class type match the level", () => {
      const classType = {
        subLevel: {
          level: {
            _id: "id1",
          },
        },
      } as unknown as Populate<ClassTypeMetaData, "subLevel">;
      const level = {
        _id: "id1",
      } as Level;

      expect(() => {
        ClassTypeRules.ensureClassTypeMatchLevel(classType, level);
      }).not.toThrow();
    });
  });
});
