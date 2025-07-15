import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { SubSubjectType, SubSubjectTypeMetaData } from "../domains/subSubjectType.entity";

export abstract class SubSubjectTypesRepo extends BaseRepo<SubSubjectTypeMetaData> {
  abstract list(
    search: string | undefined,
    listOption: ListOptions,
  ): Promise<ResponseWithPagination<SubSubjectType>>;
}
