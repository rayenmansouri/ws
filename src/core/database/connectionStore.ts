import { Connection } from "mongoose";

//singleton pattern
export class ConnectionStore {
  private static _instance: ConnectionStore | null = null;
  private validTenants: Set<string> = new Set();
  private connectionStore: Map<string, Connection> = new Map();

  private constructor() {}

  static get instance(): ConnectionStore {
    if (!ConnectionStore._instance) {
      ConnectionStore._instance = new ConnectionStore();
    }
    return ConnectionStore._instance;
  }

  addTenant(subdomain: string): void {
    this.validTenants.add(subdomain);
  }

  removeTenant(subdomain: string): void {
    this.validTenants.delete(subdomain);
    this.connectionStore.delete(subdomain);
  }

  hasTenant(subdomain: string): boolean {
    return this.validTenants.has(subdomain);
  }

  setTenantConnection(subdomain: string, connection: Connection): void {
    this.connectionStore.set(subdomain, connection);
  }

  getTenantConnection(subdomain: string): Connection | undefined {
    return this.connectionStore.get(subdomain);
  }
  getTenantConnectionOrThrow(subdomain: string): Connection {
    const connection = this.connectionStore.get(subdomain);
    if (!connection) {
      throw new Error("Tenant connection not found");
    }
    return connection;
  }

  removeTenantConnection(subdomain: string): void {
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
