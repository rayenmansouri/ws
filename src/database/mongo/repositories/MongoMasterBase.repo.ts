import { injectable, unmanaged } from "inversify";
import { ClientSession, Connection, Model } from "mongoose";
import { BaseEntity } from "../../../shared/domain/baseEntity";
import { EntityMetaData } from "../../../shared/domain/EntityMetadata.type";
import { BasePersistence } from "./../../../shared/domain/basePersistence";
import { MongoBaseRepo } from "./MongoBase.repo";

@injectable()
export abstract class MongoMasterBaseRepo<
  TDomain extends BaseEntity,
  TPersistence extends BasePersistence,
  MetaData extends EntityMetaData<TDomain>
> extends MongoBaseRepo<TDomain, TPersistence, MetaData> {
  constructor(
    @unmanaged() connection: Connection,
    @unmanaged() model: Model<MetaData["entity"]>,
    @unmanaged() session: ClientSession | null
  ) {
    // @ts-expect-error -- This is needed to not complicated the code more and will only be used here
    super(connection, model.modelName, session);
  }
}
