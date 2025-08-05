import { Connection, Model } from "mongoose";
import { ConnectionPool } from "../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";

import { ROLE_REPOSITORY_IDENTIFIER } from "./constant";
import { Role, RoleDto, RoleInput } from "./role.entity";
import { inject } from "../../core/container/TypedContainer";
import { RoleKey, RoleSchema } from "./role.schema";
import { BaseRepository } from "../../core/database/baseRepository";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIER } from "../../core/database/constant";


@Injectable({
    identifier: ROLE_REPOSITORY_IDENTIFIER,
})
export class RoleRepository extends BaseRepository<RoleInput, Role>{
    dto = RoleDto;
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIER) masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
    ){
        super(connectionPool, masterConnection, currentConnection);
    }

    getModel(): Model<Role> {
        return this.connection.model<Role>(RoleKey, RoleSchema);
    }
}