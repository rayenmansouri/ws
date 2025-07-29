import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { TranslationPaths } from "../../../translation/translationKeys";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { SubLevel, SubLevelMetaData } from "./subLevel.entity";

export abstract class SubLevelRepo extends BaseRepo<SubLevelMetaData> {
  abstract findSubLevelsOfLevels(levelIds: ID[]): Promise<SubLevel[]>;

  abstract listSubLevels(
    filter: Partial<{
      search: string;
      hasSections: boolean;
      levelNewIds: string[];
    }>,
    options: ListOptions & { sort?: Partial<Record<keyof SubLevelMetaData["entity"], 1 | -1>> },
  ): Promise<ResponseWithPagination<SubLevel>>;

  abstract findOneByRankOrThrow(rank: number, message: TranslationPaths): Promise<SubLevel>;
  abstract updateManyByLevel(levelId: ID, data: Partial<SubLevel>): Promise<void>;
  abstract findManyByLevel(levelId: ID): Promise<SubLevel[]>;
  abstract count(): Promise<number>;
  abstract updateSchoolYear(schoolYearId: ID, data: SchoolYear): Promise<void>;
  abstract findSubLevelsByLevelIdsOrderedByRank(
    levelsIds: ID[],
  ): Promise<SubLevelMetaData["entity"][]>;
}
