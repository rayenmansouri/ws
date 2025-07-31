import { Connection, FilterQuery } from "mongoose";
import { inject } from "../../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { BaseUserSchema } from "./base-user.schema";
import { BaseUser, BaseUserEntity, CreateBaseUser } from "./base-user.entity";
import { BaseRepository } from "../../../../core/baseRepository";
import { ConnectionPool } from "../../../../database/connectionDB/tenantPoolConnection";

@injectable()
export class UserRepository extends BaseRepository {
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection,
    ) {
        super(connectionPool, masterConnection);
    }

    async findOne(query: FilterQuery<BaseUser>):Promise<BaseUserEntity | null>{
        if(!this.connection) throw Error("Connection not found");
        const BaseUserModel = this.connection.model<BaseUser>("BaseUser", BaseUserSchema);
        const user = await BaseUserModel.findOne(query);
        return user ? BaseUserEntity.fromJSON(user) : null;
    }

    async create(user: CreateBaseUser): Promise<BaseUserEntity>{
        if(!this.connection) throw Error("Connection not found");
        const BaseUserModel = this.connection.model<BaseUser>("BaseUser", BaseUserSchema);
        const newUser = await BaseUserModel.create(user);
        return BaseUserEntity.fromJSON(newUser);
    }
} ;