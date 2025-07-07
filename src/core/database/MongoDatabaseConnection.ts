import { injectable } from "inversify";
import mongoose, { Connection, Schema } from "mongoose";
import { auth_db, database_secret } from "../../config";
import { allMongoSchemas } from "../../database/mongo/allmongoSchema";
import { IDatabaseManager } from "./IDatabaseManager";
import { ConnectionStore } from "./connectionStore";

@injectable()
export class MongoDatabaseManager implements IDatabaseManager {
  getTenantConnection(subdomain: string): Promise<Connection> {
    const store = ConnectionStore.instance;
    if (!store.hasTenant(subdomain)) {
      throw new Error("Tenant does not exist");
    }
    let connection = store.getTenantConnection(subdomain);
    if (connection) return Promise.resolve(connection);

    const uri = this.buildConnectionString(subdomain);
    connection = mongoose.createConnection(uri);
    this.initializeModels(connection, allMongoSchemas);
    store.setTenantConnection(subdomain, connection);
    return Promise.resolve(connection);
  }

  async removeTenantConnection(subdomain: string): Promise<void> {
    const store = ConnectionStore.instance;
    const connection = store.getTenantConnectionOrThrow(subdomain);
    await connection.close();
    store.removeTenantConnection(subdomain);
  }

  buildConnectionString(subdomain: string): string {
    return `${database_secret}/${subdomain}?${auth_db}`;
  }

  initializeModels(connection: unknown, schemas: unknown): void {
    const conn = connection as Connection;
    const mongoSchemas = schemas as { [entity: string]: Schema };
    Object.entries(mongoSchemas).forEach(([entity, schema]) => {
      conn.model(entity, schema);
    });
  }
}
