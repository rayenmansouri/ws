import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { SubLevel } from "../../subLevels/domains/subLevel.entity";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassTypeMetaData } from "../repo/classType.entity";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class UpdateClassTypeUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    data: Partial<{
      name: string;
      capacity: number;
      subLevelNewId: string;
      sectionNewId: string;
      isTerminal: boolean;
    }> & { nextClassTypeNewIds: string[] },
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    if (data.name && data.name != classType.name) {
      await this.classTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    }

    if (data.subLevelNewId) {
      const classAlreadyGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
        classType._id,
        classType.subLevel.level.currentSchoolYear._id,
      );

      if (classAlreadyGenerated) {
        throw new BadRequestError("class.alreadyGenerated");
      }
    }

    let newSubLevel: SubLevel | null = null;
    if (data.subLevelNewId) {
      newSubLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
        data.subLevelNewId,
        "notFound.subLevel",
      );
    }

    let nextClassTypeIds: ID[] | null = null;

    if (data.nextClassTypeNewIds.length > 0) {
      const nextClassTypes = await this.classTypeRepo.findManyByNewIdsOrThrow(
        data.nextClassTypeNewIds,
        "notFound.classType",
        { populate: ["subLevel"] },
      );
      this.validateNextClassType(nextClassTypes, newSubLevel || classType.subLevel);
      nextClassTypeIds = nextClassTypes.map(nextClassType => nextClassType._id);
    }

    const dataToUpdate = {
      subLevel: newSubLevel?._id || undefined,
      nextClassTypes: nextClassTypeIds,
      name: data.name,
      capacity: data.capacity,
    };

    await this.classTypeRepo.updateOneById(classType._id, dataToUpdate);
  }

  private validateNextClassType(
    nextClassTypes: Populate<ClassTypeMetaData, "subLevel">[],
    subLevel: SubLevel,
  ): void {
    const currentSubLevelRank = subLevel.rank;

    nextClassTypes.forEach(nextClassType => {
      if (nextClassType.subLevel.rank != currentSubLevelRank + 1) {
        throw new NotFoundError("invalid.classType");
      }
    });
  }
}
