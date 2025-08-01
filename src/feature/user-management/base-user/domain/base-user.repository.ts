import { Connection, Model } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseUserSchema } from "./base-user.schema";
import { BaseUser, BaseUserEntity, CreateBaseUser } from "./base-user.entity";
import { BaseRepository } from "../../../../core/database/baseRepository";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../constants";

@Injectable({
    identifier: BASE_USER_REPOSITORY_IDENTIFIER,
})
export class UserRepository extends BaseRepository<CreateBaseUser, BaseUserEntity> {
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection, 
    ) {
        super(connectionPool, masterConnection);
    }

    getModel(): Model<BaseUser> {
        return this.connection.model<BaseUser>("BaseUser", BaseUserSchema);
    }

    dto = BaseUserEntity;
} ;