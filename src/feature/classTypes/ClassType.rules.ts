import { Populate } from "../../core/populateTypes";
import { BadRequestError } from "../../core/ApplicationErrors";
import { Level } from "../levels/domains/level.entity";
import { ClassTypeMetaData } from "./repo/classType.entity";

export class ClassTypeRules {
  static ensureClassTypeMatchLevel(
    classType: Populate<ClassTypeMetaData, "subLevel">,
    level: Level,
  ): void {
    if (classType.subLevel.level._id !== level._id)
      throw new BadRequestError("classTypeRules.classTypeAndLevelAreNotValid");
  }
}
