import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { GroupTypeMetaData, GroupType } from "../domains/groupType.entity";

export abstract class GroupTypeRepo extends BaseRepo<GroupTypeMetaData> {
  abstract list(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<GroupTypeMetaData, "exams.examType">>>;

  abstract findOneByExamType(examTypeId: ID): Promise<GroupType | null>;
}
