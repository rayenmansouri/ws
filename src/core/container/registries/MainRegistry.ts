import { CoreRegistry } from "./CoreRegistry";
import { OrganizationRegistry } from "./SchoolRegistry";

// Main registry that combines all feature registries
export type MainRegistry = CoreRegistry & OrganizationRegistry;

// For now, we'll focus on the Organization feature and core services
// Other features can be added as separate registry files later 