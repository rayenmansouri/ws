import { Populate } from "./../../../core/populateTypes";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { SchoolYear, SchoolYearMetaData } from "./schoolYear.entity";
import { Term } from "../../terms/domains/term.entity";

export abstract class SchoolYearRepo extends BaseRepo<SchoolYearMetaData> {
  abstract findManyByLevel(levelId: ID): Promise<Populate<SchoolYearMetaData, "level">[]>;
  abstract list(
    search: string | undefined,
    options: ListOptions,
  ): Promise<ResponseWithPagination<SchoolYear>>;

  abstract updateTerm(termId: ID, term: Partial<Term>): Promise<void>;

  abstract findOneByTerm(termId: ID): Promise<SchoolYear | null>;

  abstract findByLevelAndRange(
    levelId: ID,
    range: { startDate: Date; endDate: Date },
  ): Promise<SchoolYear | null>;
}
