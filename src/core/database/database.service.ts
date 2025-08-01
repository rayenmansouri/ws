import { injectable } from "inversify";
import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import mongoose, { Connection } from "mongoose";
import { newConnectionPools } from "../../database/connectionDB/tenantPoolConnection";
import { getDatabaseUri } from "../../configs/database.config";
import { schemaRegistry } from "./schema";
import logger from "../Logger";

export const DATABASE_SERVICE_IDENTIFIER = "DatabaseService";

@injectable()
export class DatabaseService {
  private organizationStore: Record<string, Organization> = {};
  private connectionPool: Record<string, Connection> = {};

  constructor() {
    logger.info("intialized database service");
  }

  addOrganization(organization: Organization): void {
    this.organizationStore[organization.id] = organization;
  }

  getOrganization(id: string): Organization | undefined {
    return this.organizationStore[id];
  }

  getAllOrganizations(): Organization[] {
    return Object.values(this.organizationStore);
  }

  importTenantModels(connection: Connection): void {
    Object.entries(schemaRegistry).forEach(([key, schema]) => {
        connection.model(key, schema);
      });
  }

  getNewTenantConnection(subdomain: string): Connection {
    const connection = this.connectionPool[subdomain];
    if (connection !== undefined) {
        return connection;
    }
    const newConnection = mongoose.createConnection(getDatabaseUri(subdomain));
    
    this.importTenantModels(newConnection);
    
    newConnectionPools[subdomain] = newConnection;
    return newConnectionPools[subdomain];
  }
  
}


