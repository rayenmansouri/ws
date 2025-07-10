import { injectable } from "inversify";
import { Connection } from "mongoose";
import { inject } from "../container/TypedContainer";
import { SubdomainVo } from "./../../shared/value-objects/Subdomain.vo";
import { IDatabaseManager } from "./IDatabaseManager";

@injectable()
export class DatabaseManager {
  constructor(
    @inject("IDatabaseManager")
    private readonly dbConnection: IDatabaseManager
  ) {}

  async getTenantConnection(subdomain: SubdomainVo): Promise<Connection> {
    return this.dbConnection.getTenantConnection(subdomain);
  }

  async removeTenantConnection(subdomain: SubdomainVo): Promise<void> {
    return this.dbConnection.removeTenantConnection(subdomain);
  }
}
