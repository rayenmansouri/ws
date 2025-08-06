import { TypedContainer } from "../TypedContainer";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";

export function registerOrganizationDependencies(container: TypedContainer): void {
  // Register Organization Repositories
  container.bind(ORGANIZATION_REPOSITORY_IDENTIFIER).to(OrganizationRepository).inSingletonScope();
  // Legacy binding for compatibility
  container.bind("SchoolRepo").to(OrganizationRepository).inSingletonScope();
} 