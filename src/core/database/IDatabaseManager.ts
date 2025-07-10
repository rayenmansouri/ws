import { Connection } from "mongoose";
import { SubdomainVo } from "./../../shared/value-objects/Subdomain.vo";

export interface IDatabaseManager {
  getTenantConnection(subdomain: SubdomainVo): Promise<Connection>;
  removeTenantConnection(subdomain: SubdomainVo): Promise<void>;
  buildConnectionString(subdomain: SubdomainVo): string;
  initializeModels(connection: unknown, schemas: unknown): void;
}
