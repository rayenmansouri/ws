import * as mongoose from "mongoose";
import { schoolDocStore } from "../../core/subdomainStore";
import { OrganizationSchema } from "../../feature/organization-magement/domain/organization.schema";
import { getDatabaseUri } from "../../configs/database.config";
import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import { BaseUserSchema } from "../../feature/user-management/base-user/domain/base-user.schema";

const allSchemas = {
  BaseUser: BaseUserSchema,
  Organization: OrganizationSchema,
};
export type ConnectionPool = Record<string, mongoose.Connection>;
export const connectionPools: { [subdomain: string]: mongoose.Connection } = {};
export const newConnectionPools: ConnectionPool = {};

// export async function getTenantCon(subdomain: string): Promise<mongoose.Connection> {
//   const connection = connectionPools[subdomain];

//   if (connection) {
//     return connection;
//   }
//   connectionPools[subdomain] = mongoose.createConnection(
//     `${database_secret}/${subdomain}?${auth_db}`,
//   );
//   //initializeModels(connectionPools[subdomain], tenantSchemas);
//   await initializeNewID(connectionPools[subdomain]);
//   return connectionPools[subdomain];
// }

export const importTenantModels = (connection: mongoose.Connection) => {
  Object.entries(allSchemas).forEach(([key, schema]) => {
    connection.model(key, schema);
  });
};

export const getNewTenantConnection = async (subdomain: string): Promise<mongoose.Connection> => {
  const connection = newConnectionPools[subdomain];
  if (connection !== undefined) {
    return connection;
  }
  const newConnection = mongoose.createConnection(getDatabaseUri(subdomain));
  
  importTenantModels(newConnection);
  
  newConnectionPools[subdomain] = newConnection;
  return newConnectionPools[subdomain];
};

export const removeTenantConnectionFromPool = (subdomain: string): void => {
  delete connectionPools[subdomain];
};

export const getOrganizationFromSubdomain = (subdomain: string): Organization | undefined => {
  const organization = Object.values(schoolDocStore).find((organizationDoc) => organizationDoc.subdomain === subdomain);

  return organization as Organization | undefined;
};

// Keep the old function name for backward compatibility during migration
export const getSchoolFromSubdomain = getOrganizationFromSubdomain;
