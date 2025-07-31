import * as mongoose from "mongoose";
import { schoolDocStore } from "../../core/subdomainStore";
import { School } from "../../feature/school-management/domain/school.entity";
import { BaseUserSchema } from "../../feature/user-management/base-user/domain/base-user.schema";
import { SchoolSchema } from "../../feature/school-management/domain/school.schema";
import { getDatabaseUri } from "../../configs/database.config";

const allSchemas = {
  BaseUser: BaseUserSchema,
  School: SchoolSchema,
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

export const getSchoolFromSubdomain = (subdomain: string): School | undefined => {
  const school = Object.values(schoolDocStore).find((schoolDoc) => schoolDoc.subdomain === subdomain);

  return school as School | undefined;
};
