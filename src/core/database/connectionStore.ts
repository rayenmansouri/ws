import { SubdomainVo } from "./../../shared/value-objects/Subdomain.vo";
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

  addTenant(subdomain: SubdomainVo): void {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    this.validTenants.add(subdomain.toString());
  }

  removeTenant(subdomain: SubdomainVo): void {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    this.validTenants.delete(subdomain.toString());
    this.connectionStore.delete(subdomain.toString());
  }

  hasTenant(subdomain: SubdomainVo): boolean {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    return this.validTenants.has(subdomain.toString());
  }

  setTenantConnection(subdomain: SubdomainVo, connection: Connection): void {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    this.connectionStore.set(subdomain.toString(), connection);
  }

  getTenantConnection(subdomain: SubdomainVo): Connection | undefined {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    return this.connectionStore.get(subdomain.toString());
  }
  getTenantConnectionOrThrow(subdomain: SubdomainVo): Connection {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    const connection = this.connectionStore.get(subdomain.toString());
    if (!connection) {
      throw new Error("Tenant connection not found");
    }
    return connection;
  }

  removeTenantConnection(subdomain: SubdomainVo): void {
    Guard.againstEmptyString(subdomain.toString(), "subdomain");
    this.connectionStore.delete(subdomain.toString());
  }

  clearTenants(): void {
    this.validTenants.clear();
    this.connectionStore.clear();
  }

  getAllTenants(): SubdomainVo[] {
    return Array.from(this.validTenants).map((subdomain) =>
      SubdomainVo.create(subdomain)
    );
  }
}
