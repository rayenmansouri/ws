import { Role } from "./../../../feature/authorization/domain/role.entity";
import { Master } from "./../../../feature/masters/domain/master.entity";
import { injectable, unmanaged } from "inversify";
import { ClientSession, Connection, Model } from "mongoose";
import { EntityMetaData } from "../../../shared/domain/EntityMetadata.type";
import { MongoBaseRepo } from "./MongoBase.repo";

@injectable()
export abstract class MongoMasterBaseRepo<
  MetaData extends EntityMetaData<Role>
> extends MongoBaseRepo<MetaData> {
  constructor(
    @unmanaged() connection: Connection,
    @unmanaged() model: Model<MetaData["entity"]>,
    @unmanaged() session: ClientSession | null
  ) {
    // @ts-expect-error -- This is needed to not complicated the code more and will only be used here
    super(connection, model.modelName, session);
  }
}
