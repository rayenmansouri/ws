import * as mongoose from "mongoose";
import { auth_db, database_secret } from "../../config";
import { schoolDocStore } from "../../core/subdomainStore";
import { School } from "../../feature/school-management/domain/school.entity";

export const connectionPools: { [subdomain: string]: mongoose.Connection } = {};
export const newConnectionPools: { [subdomain: string]: mongoose.Connection } = {};

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

export const getNewTenantConnection = async (subdomain: string): Promise<mongoose.Connection> => {
  const connection = newConnectionPools[subdomain];
  if (connection !== undefined) {
    return connection;
  }
  const newConnection = mongoose.createConnection(`${database_secret}/${subdomain}?${auth_db}`);
  newConnectionPools[subdomain] = newConnection;
  return newConnectionPools[subdomain];
};

export const removeTenantConnectionFromPool = (subdomain: string): void => {
  delete connectionPools[subdomain];
};

export const getSchoolFromSubdomain = (subdomain: string): School | undefined => {
  const school = Object.values(schoolDocStore).find(schoolDoc => schoolDoc.subdomain === subdomain);

  return school;
};
