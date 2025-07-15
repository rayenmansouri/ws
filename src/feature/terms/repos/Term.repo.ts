import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { Term, TermMetaData } from "../domains/term.entity";

export abstract class TermRepo extends BaseRepo<TermMetaData> {
  abstract list(query: { name?: string } & ListOptions): Promise<ResponseWithPagination<Term>>;
}
