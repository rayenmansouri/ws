import { Connection, Model } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { OrganizationSchema } from "./organization.schema";
import { Organization, OrganizationEntity, OrganizationInput } from "./organization.entity";
import { BaseRepository } from "../../../core/database/baseRepository";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../constant";

@Injectable({
    identifier: ORGANIZATION_REPOSITORY_IDENTIFIER,
})
export class OrganizationRepository extends BaseRepository<OrganizationInput, Organization>{
    dto = OrganizationEntity;
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection,
    ){
        super(connectionPool, masterConnection);
    }

    getModel(): Model<Organization> {
        return this.connection.model<Organization>("Organization", OrganizationSchema);
    }
}