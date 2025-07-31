import { Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { OrganizationSchema } from "./organization.schema";
import { Organization, OrganizationEntity, OrganizationInput } from "./organization.entity";
import { injectable } from "inversify";
import { BaseRepository } from "../../../core/baseRepository";
import { ConnectionPool } from "../../../database/connectionDB/tenantPoolConnection";

@injectable()
export class OrganizationRepository extends BaseRepository{
    constructor(
        @inject("ConnectionPool") connectionPool: ConnectionPool,
        @inject("MasterConnection") masterConnection: Connection,
    ){
        super(connectionPool, masterConnection);
    }

    async findOne(query: FilterQuery<Organization>): Promise<Organization | null> {
        const OrganizationModel = this.connection.model<Organization>("Organization", OrganizationSchema);
        return await OrganizationModel.findOne(query);
    }

    async create(input: OrganizationInput): Promise<Organization> {
        const OrganizationModel = this.connection.model<Organization>("Organization", OrganizationSchema);
        const createdOrganization = await OrganizationModel.create(input);
        return OrganizationEntity.fromJSON(createdOrganization);
    }

    async findAll(): Promise<Organization[]> {
        const OrganizationModel = this.connection.model<Organization>("Organization", OrganizationSchema);
        const organizations = await OrganizationModel.find();
        return organizations.map(organization => OrganizationEntity.fromJSON(organization));
    }

}