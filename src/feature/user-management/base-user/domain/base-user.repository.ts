import { Connection, Model } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseUserSchema } from "./base-user.schema";
import { BaseUser, BaseUserEntity, CreateBaseUser } from "./base-user.entity";
import { BaseRepository } from "../../../../core/database/baseRepository";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../constants";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIER } from "../../../../core/database/constant";

@Injectable({
    identifier: BASE_USER_REPOSITORY_IDENTIFIER,
})
export class UserRepository extends BaseRepository<CreateBaseUser, BaseUserEntity> {
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIER) masterConnection: Connection, 
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
    ) {
        super(connectionPool, masterConnection, currentConnection);
    }

    getModel(): Model<BaseUser> {
        return this.connection.model<BaseUser>("BaseUser", BaseUserSchema);
    }

    dto = BaseUserEntity;
} ;