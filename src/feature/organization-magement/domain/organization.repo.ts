import { Connection, Model } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { OrganizationSchema } from "./organization.schema";
import { Organization, OrganizationEntity, OrganizationInput } from "./organization.entity";
import { BaseRepository } from "../../../core/database/baseRepository";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
    identifier: "OrganizationRepository",
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