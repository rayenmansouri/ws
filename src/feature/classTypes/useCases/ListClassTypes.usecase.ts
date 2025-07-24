import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassTypeDto } from "../dtos/classType.dto";
import { ListOptions } from "../../../types/types";
import { ClassTypeMapper } from "../mappers/classType.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class ListClassTypeUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(
    queries: {
      levelNewIds: string[] | null;
      subLevelNewIds: string[] | null;
      sectionNewIds: string[] | null;
      search: string | null;
      classTypesIds?: ID[];
    },
    listOption: ListOptions,
  ): Promise<ResponseWithPagination<ClassTypeDto>> {
    const levels = queries.levelNewIds
      ? await this.levelRepo.findManyByNewIds(queries.levelNewIds)
      : null;

    const levelIds = levels?.map(level => level._id);

    const subLevelsFromLevel = levelIds
      ? await this.subLevelRepo.findSubLevelsOfLevels(levelIds)
      : null;

    const subLevels = queries.subLevelNewIds
      ? await this.subLevelRepo.findManyByNewIds(queries.subLevelNewIds)
      : null;

    const subLevelIds =
      subLevels?.map(subLevel => subLevel._id) || subLevelsFromLevel?.map(subLevel => subLevel._id);

    const classTypes = await this.classTypeRepo.listClassTypes(
      {
        subLevelIds,
        search: queries.search || undefined,
        classTypeIds: queries.classTypesIds,
      },
      listOption,
    );

    const classTypesDTOs = classTypes.docs.map(classType => {
      return ClassTypeMapper.toClassTypeDto(classType);
    });
    return { docs: classTypesDTOs, meta: classTypes.meta };
  }
}
