import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Level, LevelMetaData } from "../domains/level.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Term } from "../../terms/domains/term.entity";

export abstract class LevelRepo extends BaseRepo<LevelMetaData> {
  abstract listLevels(
    filter: { search?: string; sort?: Partial<Record<keyof LevelMetaData["entity"], 1 | -1>> },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Level>>;
  abstract updateTerm(termId: ID, data: Partial<Term>): Promise<void>;
  abstract getLevelsSortedByRank(): Promise<LevelMetaData["entity"][]>;
  abstract updateSchoolYear(schoolYearId: ID, data: SchoolYear): Promise<void>;
}
