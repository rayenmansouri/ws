import { Guard } from "./../../shared/utils/Guards";
import { Connection } from "mongoose";

export class ConnectionStore {
  private static _instance: ConnectionStore | null = null;
  private validTenants: Set<string> = new Set();
  // key : subdomain , value : connection
  private connectionStore: Map<string, Connection> = new Map();

  private constructor() {}

  static get instance(): ConnectionStore {
    if (!ConnectionStore._instance) {
      ConnectionStore._instance = new ConnectionStore();
    }
    return ConnectionStore._instance;
  }

  addTenant(subdomain: string): void {
    Guard.againstEmptyString(subdomain, "subdomain");
    this.validTenants.add(subdomain);
  }

  removeTenant(subdomain: string): void {
    Guard.againstEmptyString(subdomain, "subdomain");
    this.validTenants.delete(subdomain);
    this.connectionStore.delete(subdomain);
  }

  hasTenant(subdomain: string): boolean {
    Guard.againstEmptyString(subdomain, "subdomain");
    return this.validTenants.has(subdomain);
  }

  setTenantConnection(subdomain: string, connection: Connection): void {
    Guard.againstEmptyString(subdomain, "subdomain");
    this.connectionStore.set(subdomain, connection);
  }

  getTenantConnection(subdomain: string): Connection | undefined {
    Guard.againstEmptyString(subdomain, "subdomain");
    return this.connectionStore.get(subdomain);
  }
  getTenantConnectionOrThrow(subdomain: string): Connection {
    Guard.againstEmptyString(subdomain, "subdomain");
    const connection = this.connectionStore.get(subdomain);
    if (!connection) {
      throw new Error("Tenant connection not found");
    }
    return connection;
  }

  removeTenantConnection(subdomain: string): void {
    Guard.againstEmptyString(subdomain, "subdomain");
    this.connectionStore.delete(subdomain);
  }

  clearTenants(): void {
    this.validTenants.clear();
    this.connectionStore.clear();
  }

  getAllTenants(): string[] {
    return Array.from(this.validTenants);
  }
}
