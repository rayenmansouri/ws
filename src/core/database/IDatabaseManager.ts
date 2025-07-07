import { Connection } from "mongoose";

export interface IDatabaseManager {
  getTenantConnection(subdomain: string): Promise<Connection>;
  removeTenantConnection(subdomain: string): Promise<void>;
  buildConnectionString(subdomain: string): string;
  initializeModels(connection: unknown, schemas: unknown): void;
}
