import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { TutorialMetaData } from "./tutorial.entity";

export abstract class TutorialRepo extends BaseRepo<TutorialMetaData> {
  abstract list(
    query: { search?: string } & ListOptions,
  ): Promise<ResponseWithPagination<TutorialMetaData["entity"]>>;
}
