import { injectable } from "inversify";
import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import mongoose, { Connection } from "mongoose";
import { getDatabaseUri } from "../../configs/database.config";
import { schemaRegistry } from "./schema";
import logger from "../Logger";
import { container } from "../container/container";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { DATABASE_SERVIßE_IDENTIFIER } from "./constant";

@injectable()
export class DatabaseService {
  private organizationStore: Record<string, Organization> = {};
  private organizationStoreBySubdomain: Record<string, Organization> = {};
  public connectionPool: Record<string, Connection> = {};

  constructor() {
    logger.info("intialized database service");
  }

  addOrganization(organization: Organization): void {
    this.organizationStore[organization.id] = organization;
    this.organizationStoreBySubdomain[organization.subdomain] = organization;
  }

  getOrganization(id: string): Organization | undefined {
    // First try to find by ID, then by subdomain
    if (id in this.organizationStore) {
      return this.organizationStore[id];
    }
    if (id in this.organizationStoreBySubdomain) {
      return this.organizationStoreBySubdomain[id];
    }
    return undefined;
  }

  getAllOrganizations(): Organization[] {
    if(Object.values(this.organizationStore).length === 0) return [];
    return Object.values(this.organizationStore);
  }
  
  getOrganizationsKeys(): string[] {
    return Object.keys(this.organizationStore);
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
    
    this.connectionPool[subdomain] = newConnection;
    return newConnection;
  }

  getConnectionPool(): Record<string, Connection> {
    return this.connectionPool;
  }
  
}

export const initializeDatabases = async () => {
    const organizationRepo = container.get<OrganizationRepository>(ORGANIZATION_REPOSITORY_IDENTIFIER);
    const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
    const organizations = await organizationRepo.findAll();
    for(const organization of organizations){
      databaseService.addOrganization(organization);
      databaseService.getNewTenantConnection(organization.subdomain);
    }
  };
  


