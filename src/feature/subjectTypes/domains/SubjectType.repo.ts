import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { BaseRepo } from "../../../core/BaseRepo";
import { SubjectTypeMetaData, SubjectType } from "./subjectType.entity";

export abstract class SubjectTypeRepo extends BaseRepo<SubjectTypeMetaData> {
  abstract listSubjectTypes(
    filter: {
      search?: string;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<SubjectType>>;
}
