import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassTypeDto } from "../dtos/classType.dto";
import { ClassTypeMapper } from "../mappers/classType.mapper";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassType } from "../repo/classType.entity";
import { BaseEntity } from "../../../types/BaseEntity";

@injectable()
export class AddClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(data: {
    name: string;
    subLevelNewId: string;
    capacity: number;
    sectionNewId?: string | undefined;
    isTerminal: boolean;
    nextClassTypeNewIds: string[] | null;
  }): Promise<ClassTypeDto> {
    await this.classTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      data.subLevelNewId,
      "notFound.subLevel",
    );

    const nextClassTypes = data.nextClassTypeNewIds
      ? await this.classTypeRepo.findManyByNewIdsOrThrow(
          data.nextClassTypeNewIds,
          "notFound.classType",
          { populate: ["subLevel"] },
        )
      : null;

    const rankOfAddedClasstype = subLevel.rank;
    nextClassTypes?.forEach(classType => {
      if (classType.subLevel.rank !== rankOfAddedClasstype + 1) {
        throw new BadRequestError("invalid.classType");
      }
    });

    const terminalClassTypeInfo = data.isTerminal
      ? { isTerminal: true as const, nextClassTypes: null }
      : {
          isTerminal: false as const,
          nextClassTypes: nextClassTypes!.map(classType => classType._id),
        };

    const dataToBeAdded: Omit<ClassType, keyof BaseEntity> = {
      name: data.name,
      subLevel: subLevel._id,
      capacity: data.capacity,
      ...terminalClassTypeInfo,
      activities: [],
      subjects: [],
      fields: [],
      maxGapsPerWeekInMinutes: null,
    };
    const classType = await this.classTypeRepo.addOne(dataToBeAdded);

    return ClassTypeMapper.toClassTypeDto({
      ...classType,
      subLevel: subLevel,
      nextClassTypes: nextClassTypes || null,
    });
  }
}
