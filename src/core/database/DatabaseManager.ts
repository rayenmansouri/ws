import { injectable } from "inversify";
import { IDatabaseManager } from "./IDatabaseManager";
import { inject } from "../container/TypedContainer";
import { Connection } from "mongoose";

@injectable()
export class DatabaseManager {
  constructor(
    @inject("IDatabaseManager")
    private readonly dbConnection: IDatabaseManager
  ) {}

  async getTenantConnection(subdomain: string): Promise<Connection> {
    return this.dbConnection.getTenantConnection(subdomain);
  }

  async removeTenantConnection(subdomain: string): Promise<void> {
    return this.dbConnection.removeTenantConnection(subdomain);
  }
}
