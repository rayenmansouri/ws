import { Connection, Model } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { OrganizationKey, OrganizationSchema } from "./organization.schema";
import { Organization, OrganizationEntity, OrganizationInput } from "./organization.entity";
import { BaseRepository } from "../../../core/database/baseRepository";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../constant";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, MASTER_CONNECTION_IDENTIFIR } from "../../../core/database/constant";

@Injectable({
    identifier: ORGANIZATION_REPOSITORY_IDENTIFIER,
})
export class OrganizationRepository extends BaseRepository<OrganizationInput, Organization>{
    dto = OrganizationEntity as any;    
    constructor(
        @inject(CONNECTION_POOL_IDENTIFIER) connectionPool: ConnectionPool,
        @inject(MASTER_CONNECTION_IDENTIFIR) masterConnection: Connection,
        @inject(CURRENT_CONNECTION_IDENTIFIER) currentConnection: string,
    ){
        super(connectionPool, masterConnection, currentConnection);
    }

    getModel(): Model<any> {
        return this.connection.model<any>(OrganizationKey, OrganizationSchema);
    }
}