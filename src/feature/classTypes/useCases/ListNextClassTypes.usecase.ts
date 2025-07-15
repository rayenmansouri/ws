import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { ListOptions } from "../../../types/types";
import { ClassTypeMapper } from "../mappers/classType.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ClassTypeDto } from "../dtos/classType.dto";

@injectable()
export class ListNextClassTypesUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(
    query: { subLevelNewId: string; search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<ClassTypeDto>> {
    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      query.subLevelNewId,
      "notFound.subLevel",
    );

    const nextSubLevel = await this.subLevelRepo.findOneByRankOrThrow(
      subLevel.rank + 1,
      "notFound.subLevel",
    );

    const classTypes = await this.classTypeRepo.listClassTypes(
      { search: query.search, subLevelIds: [nextSubLevel._id] },
      options,
    );

    const classTypeDTO = classTypes.docs.map(classType =>
      ClassTypeMapper.toClassTypeDto(classType),
    );

    return { docs: classTypeDTO, meta: classTypes.meta };
  }
}
