import * as mongoose from "mongoose";
import { schoolDocStore } from "../../core/subdomainStore";
import { OrganizationSchema } from "../../feature/organization-magement/domain/organization.schema";
import { getDatabaseUri } from "../../configs/database.config";
import { Organization } from "../../feature/organization-magement/domain/organization.entity";
import { BaseUserSchema } from "../../feature/user-management/base-user/domain/base-user.schema";
import Logger from "../../core/Logger";

const allSchemas = {
  BaseUser: BaseUserSchema,
  Organization: OrganizationSchema,
};

export type ConnectionPool = Record<string, mongoose.Connection>;
export const connectionPools: { [subdomain: string]: mongoose.Connection } = {};
export const newConnectionPools: ConnectionPool = {};

// Track connection usage for cleanup
const connectionLastUsed: Record<string, number> = {};
const MAX_IDLE_TIME = 30 * 60 * 1000; // 30 minutes
const MAX_POOL_SIZE = 50;

export const importTenantModels = (connection: mongoose.Connection) => {
  Object.entries(allSchemas).forEach(([key, schema]) => {
    try {
      connection.model(key, schema);
    } catch (error) {
      // Model might already exist, which is fine
      Logger.warn(`Model ${key} already registered for connection`);
    }
  });
};

export const getNewTenantConnection = async (subdomain: string): Promise<mongoose.Connection> => {
  const connection = newConnectionPools[subdomain];
  if (connection !== undefined) {
    connectionLastUsed[subdomain] = Date.now();
    return connection;
  }

  // Check if we're at max pool size
  if (Object.keys(newConnectionPools).length >= MAX_POOL_SIZE) {
    await cleanupIdleConnections();
  }

  try {
    const newConnection = mongoose.createConnection(getDatabaseUri(subdomain));
    
    // Set up connection event handlers
    newConnection.on('error', (err) => {
      Logger.error(`Database connection error for ${subdomain}:`, err);
    });

    newConnection.on('disconnected', () => {
      Logger.info(`Database connection disconnected for ${subdomain}`);
      delete newConnectionPools[subdomain];
      delete connectionLastUsed[subdomain];
    });

    await new Promise((resolve, reject) => {
      newConnection.once('open', resolve);
      newConnection.once('error', reject);
    });

    importTenantModels(newConnection);
    
    newConnectionPools[subdomain] = newConnection;
    connectionLastUsed[subdomain] = Date.now();
    
    return newConnectionPools[subdomain];
  } catch (error) {
    Logger.error(`Failed to create connection for ${subdomain}:`, error);
    throw error;
  }
};

export const cleanupIdleConnections = async (): Promise<void> => {
  const now = Date.now();
  const connectionsToClose: string[] = [];

  for (const [subdomain, lastUsed] of Object.entries(connectionLastUsed)) {
    if (now - lastUsed > MAX_IDLE_TIME) {
      connectionsToClose.push(subdomain);
    }
  }

  for (const subdomain of connectionsToClose) {
    await removeTenantConnectionFromPool(subdomain);
  }

  Logger.info(`Cleaned up ${connectionsToClose.length} idle connections`);
};

export const removeTenantConnectionFromPool = async (subdomain: string): Promise<void> => {
  const connection = newConnectionPools[subdomain];
  if (connection) {
    try {
      await connection.close();
    } catch (error) {
      Logger.error(`Error closing connection for ${subdomain}:`, error);
    }
  }
  
  delete connectionPools[subdomain];
  delete newConnectionPools[subdomain];
  delete connectionLastUsed[subdomain];
};

export const getSchoolFromSubdomain = (subdomain: string): Organization | undefined => {
  const organization = Object.values(schoolDocStore).find((organizationDoc) => organizationDoc.subdomain === subdomain);

  return organization as Organization | undefined;
};

// Periodic cleanup
setInterval(cleanupIdleConnections, 10 * 60 * 1000); // Every 10 minutes
