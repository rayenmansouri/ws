import { ConfigService } from "./../../shared/config/ConfigService";
import { injectable } from "inversify";
import mongoose, { Connection, Schema } from "mongoose";
import { allMongoSchemas } from "../../database/mongo/allmongoSchema";
import { IDatabaseManager } from "./IDatabaseManager";
import { ConnectionStore } from "./connectionStore";
import { SubdomainVo } from "../../shared/value-objects/Subdomain.vo";

@injectable()
export class MongoDatabaseManager implements IDatabaseManager {
  getTenantConnection(subdomain: SubdomainVo): Promise<Connection> {
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

  async removeTenantConnection(subdomain: SubdomainVo): Promise<void> {
    const store = ConnectionStore.instance;
    const connection = store.getTenantConnectionOrThrow(subdomain);
    await connection.close();
    store.removeTenantConnection(subdomain);
  }

  buildConnectionString(subdomain: SubdomainVo): string {
    return `${ConfigService.get(
      "database_secret"
    )}/${subdomain.toString()}?${ConfigService.get("auth_db")}`;
  }

  initializeModels(connection: unknown, schemas: unknown): void {
    const conn = connection as Connection;
    const mongoSchemas = schemas as { [entity: string]: Schema };
    Object.entries(mongoSchemas).forEach(([entity, schema]) => {
      conn.model(entity, schema);
    });
  }
}
