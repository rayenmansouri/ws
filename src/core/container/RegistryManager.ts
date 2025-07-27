import { MainRegistry } from "./registries/MainRegistry";

export class RegistryManager {
  private static instance: RegistryManager | null = null;
  private registries: Map<string, Record<string, unknown>> = new Map();

  static getInstance(): RegistryManager {
    if (RegistryManager.instance === null) {
      RegistryManager.instance = new RegistryManager();
    }
    return RegistryManager.instance;
  }

  registerFeatureRegistry(name: string, registry: Record<string, unknown>): void {
    this.registries.set(name, registry);
  }

  getCombinedRegistry(): MainRegistry {
    // Combine all registries into one type
    const combined: Record<string, unknown> = {};
    
    for (const [, registry] of this.registries) {
      Object.assign(combined, registry);
    }
    
    return combined as MainRegistry;
  }

  getRegistryKeys(): string[] {
    return Array.from(this.registries.keys());
  }
} 