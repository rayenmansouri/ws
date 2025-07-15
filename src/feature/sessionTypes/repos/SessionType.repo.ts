import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { SessionType, SessionTypeMetaData } from "../domains/sessionType.entity";

export abstract class SessionTypeRepo extends BaseRepo<SessionTypeMetaData> {
  abstract list(
    query: Partial<{ name: string } & ListOptions>,
  ): Promise<ResponseWithPagination<SessionType>>;
}
