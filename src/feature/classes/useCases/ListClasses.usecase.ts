import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassRepo } from "../domain/Class.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ClassMapper } from "../mappers/Classes.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ClassDTO } from "../dto/Classes.dto";

@injectable()
export class ListClassesUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}
  async execute(
    query: Partial<
      {
        levelNewIds: string[];
        classTypeNewIds: string[];
        search: string;
      } & ListOptions
    >,
  ): Promise<ResponseWithPagination<ClassDTO>> {
    let schoolYearIds: ID[] | undefined;
    let classTypeIds: ID[] | undefined;
    if (query.levelNewIds) {
      const levels = await this.levelRepo.findManyByNewIdsOrThrow(
        query.levelNewIds,
        "notFound.level",
      );
      schoolYearIds = levels.map(level => level.currentSchoolYear._id);
    }

    if (query.classTypeNewIds) {
      const classTypes = await this.classTypeRepo.findManyByNewIdsOrThrow(
        query.classTypeNewIds,
        "notFound.classType",
      );

      classTypeIds = classTypes.map(classType => classType._id);
    }

    const data = await this.classRepo.listClasses(
      {
        search: query.search,
        classType: classTypeIds,
        schoolYears: schoolYearIds,
      },
      {
        limit: query.limit,
        page: query.page,
      },
    );

    const docs = data.docs.map(ClassMapper.toClassDto);
    return { docs, meta: data.meta };
  }
}
