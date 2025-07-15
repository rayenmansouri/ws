import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { InteractionMetaData } from "./interaction.entity";

export abstract class InteractionRepo extends BaseRepo<InteractionMetaData> {
  abstract listInteractionsOfIssue(
    issueId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<InteractionMetaData, "actor" | "sender" | "target">>>;
}
