import { MiddlewareRegistry } from "./MiddlewareRegistry";
import { GetTenantConnectionMiddleware } from "./getTenantConnection";
import { MasterAuthenticationMiddleware } from "./master.auth";
import { AuthorizeMiddleware } from "./authorize";
import { HandleRequestMiddleware } from "./handle-request.middleware";
import { ValidateSchemaMiddleware } from "./validateSchema";
import { MulterMiddleware } from "./upload";
import { LoggingMiddleware } from "./LoggingMiddleware";

export function registerCoreMiddlewares(): void {
  const registry = MiddlewareRegistry.getInstance();
  
  // Register core middleware in order
  registry.add(GetTenantConnectionMiddleware);
  registry.add(MasterAuthenticationMiddleware);
  registry.add(AuthorizeMiddleware);
  registry.add(HandleRequestMiddleware);
  registry.add(ValidateSchemaMiddleware);
  registry.add(MulterMiddleware);
  
  // Example: Adding new middleware is as simple as this line
  // No modification of existing code required - OCP compliant!
  registry.add(LoggingMiddleware);
} 