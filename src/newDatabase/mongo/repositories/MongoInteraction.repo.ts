import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { InteractionMetaData } from "../../../feature/issues/domain/interaction.entity";
import { InteractionRepo } from "../../../feature/issues/domain/Interaction.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoInteractionRepo
  extends MongoBaseRepo<InteractionMetaData>
  implements InteractionRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "interaction", session);
  }

  async listInteractionsOfIssue(
    issueId: ID,
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<InteractionMetaData, "actor" | "sender" | "target">>> {
    const interactions = await this.findManyWithPagination(
      {
        issue: issueId,
      },
      {
        ...options,
        sort: { sentAt: -1 },
        populate: ["actor", "sender", "target"],
      },
    );

    return interactions;
  }
}
