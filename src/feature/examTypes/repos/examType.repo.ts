import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { ExamTypeMetaData, ExamType } from "../domains/examType.entity";

export abstract class ExamTypeRepo extends BaseRepo<ExamTypeMetaData> {
  abstract list(query: { name?: string } & ListOptions): Promise<ResponseWithPagination<ExamType>>;
}
