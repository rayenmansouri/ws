import { Connection, Model } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseUserSchema } from "./base-user.schema";
import { BaseUserEntity, CreateBaseUser } from "./base-user.entity";
import { BaseRepository } from "../../../../core/database/baseRepository";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
    identifier: "UserRepository",
})
export class UserRepository extends BaseRepository<CreateBaseUser, BaseUserEntity> {
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection,
    ) {
        super(connectionPool, masterConnection);
    }

    getModel(): Model<BaseUserEntity> {
        return this.connection.model<BaseUserEntity>("BaseUser", BaseUserSchema);
    }

    dto = BaseUserEntity;
} ;