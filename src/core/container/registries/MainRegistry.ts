import { CoreRegistry } from "./CoreRegistry";
import { SchoolRegistry } from "./SchoolRegistry";

// Main registry that combines all feature registries
export type MainRegistry = CoreRegistry & SchoolRegistry;

// For now, we'll focus on the School feature and core services
// Other features can be added as separate registry files later 